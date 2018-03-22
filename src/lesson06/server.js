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
                items.forEach(item => {
                    dbo.collection('habrahabr').insertOne({
                        guid: item.guid[0],
                        title: item.title[0],
                        link: item.link[0],
                        description: item.description[0],
                        publishedDate: item.pubDate[0],
                        category: item.category,
                        creator: item['dc:creator']
                    })
                });

                return items.length;
            }).catch(err => {
                console.log(err);
            })
    }).then((countItems) => {
        console.log('Import is done! ' + countItems + ' items were imported!');
    });
