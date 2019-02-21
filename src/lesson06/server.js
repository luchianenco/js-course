const https = require('https');
const promisify = require('util').promisify;
const MongoClient = require('mongodb').MongoClient;
const parseString = require('xml2js').parseString;

// Example 'https://habrahabr.ru/rss/feed/posts/6435ab455cc26ab2a3a07a52929d35cf/';
const RSS = process.argv[2];

if (! RSS) {
    throw new Error('No RSS URL provided');
}

const promiseParseXML = promisify(parseString);
const promiseMongoConnect = promisify(MongoClient.connect);

function promiseLoad(url) {
    return new Promise((resolve, reject) => {
        const request = https.get(url, (response) => {
            if (response.statusCode < 200 || response.statusCode > 299) {
                reject(new Error('Failed to load page, status code: ' + response.statusCode));
            }
            const body = [];
            response.on('data', (chunk) => body.push(chunk));
            response.on('end', () => resolve(body.join('')));
        });
        request.on('error', (err) => reject(err))
    })
}

function insertItems(collection, items) {
    return items.map(item => {
        return new Promise(resolve => {
            collection.count({ guid:  item.guid[0]._}, (err, count) => {
                if (count > 0) {
                    resolve(0);
                }
                collection.insertOne(transform(item));
                resolve(1);
            });

        })
    });
}

function transform(entry) {
    return {
        guid: entry.guid[0]._,
        title: entry.title[0],
        link: entry.link[0],
        description: entry.description[0],
        publishedDate: entry.pubDate[0],
        category: entry.category,
        creator: entry['dc:creator']
    }
}

promiseLoad(RSS).
    then(res => {
        return promiseParseXML(res);
    })
    .then(result => {
        console.log('processing...');
        if (!result || !result.rss || !result.rss.channel || !result.rss.channel || !result.rss.channel[0] || !result.rss.channel[0].item) {
            throw new Error('no items found');
        }
        const items = result.rss.channel[0].item;
        return promiseMongoConnect('mongodb://localhost:27017/')
            .then(database => {
                const dbo = database.db('otus');
                const habraCollection = dbo.collection('habrahabr');
                return Promise.all(insertItems(habraCollection, items)).then((cnt) => {
                    const reducer = (acc, val) => acc + val;
                    const inserted = cnt.reduce(reducer);
                    return { processed :items.length, inserted};
                });

            }).catch(err => {
                console.log(err);
            })
    }).then((items) => {
        console.log('Import is done! ' + items.inserted + ' items of ' + items.processed + ' were imported!');
    }).catch(err => {
        console.log(err);
    });
