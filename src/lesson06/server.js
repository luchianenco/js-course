const fs = require('fs');
const promisify = require('util').promisify;
const MongoClient = require('mongodb').MongoClient;
const parseString = require('xml2js').parseString;

const URL = 'https://habrahabr.ru/rss/feed/posts/6435ab455cc26ab2a3a07a52929d35cf/';
const FILE = './habr.xml';

const promiseReadFile = promisify(fs.readFile);
const promiseParseXML = promisify(parseString);
const promiseMongoConnect = promisify(MongoClient.connect);

promiseReadFile(FILE).
    then(content => {
        return promiseParseXML(content)
    })
    .then(result => {
        if (!result || !result.rss || !result.rss.channel || !result.rss.channel || !result.rss.channel[0] || !result.rss.channel[0].item) {
            console.log('no items found');
            return;
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
    });


function insertItems(collection, items) {
    return items.map(item => {
        return new Promise(resolve => {
            collection.count({ guid:  item.guid[0]._}, (err, count) => {
                if (count > 0) {
                    resolve(0);
                }

                collection.insertOne({
                    guid: item.guid[0]._,
                    title: item.title[0],
                    link: item.link[0],
                    description: item.description[0],
                    publishedDate: item.pubDate[0],
                    category: item.category,
                    creator: item['dc:creator']
                });

                resolve(1);
            });

        })
    });
}