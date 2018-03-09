const fs = require('fs');

const promisify = function(func) {
    return function () {
        const args = arguments;

        return new Promise(function (resolve, reject) {
            try {
                func.call(this, ...args, (err, ...values) => {
                    if (err) {
                        return reject(err);
                    }

                    if (values.length > 0) {
                        resolve(...values);
                    } else {
                        resolve(true);
                    }
                });
            } catch (err) {
                reject(err);
            }
        })
    }
};

const reader = promisify(fs.readFile);
reader('./data.json', 'utf8').then(res => {
   console.log(JSON.parse(res));
}).catch(err => {
    console.log(err);
});

const accesser = promisify(fs.access);
accesser('/etc/passwd123', fs.constants.R_OK).then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
});