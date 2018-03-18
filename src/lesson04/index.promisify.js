const fs = require('fs');
const path = require('path');
const util = require('util');

const promiseReadDir = util.promisify(fs.readdir);
const promiseStat = util.promisify(fs.stat);
const homeDir = '../';

function listFiles(filepath) {
    const results = {
        files: [],
        folders: []
    };
    return promiseStat(filepath)
        .then(stats => {
            if (stats.isDirectory()) {
                results.folders.push(filepath);
                return promiseReadDir(filepath)
                    .then(childNames => childNames.sort())
                    .then(sortedNames =>
                        Promise.all(
                            sortedNames.map(childName =>
                                listFiles(path.resolve(filepath, childName))
                            )
                        )
                    )
                    .then(subtrees => {
                        subtrees.forEach(subtree => {
                            results.files = results.files.concat(subtree.files);
                            results.folders = results.folders.concat(subtree.folders);
                        });
                        return results;
                    });
            } else {
                results.files.push(filepath);
                return results;
            }
        });
}

console.log(listFiles(homeDir).then(res => console.log(res)));