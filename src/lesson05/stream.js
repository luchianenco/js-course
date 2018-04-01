const { Readable, Writable, Transform } = require('stream');

const inStream = new Readable({
    read(size) {
        const max = 100;
        const number = Math.floor(Math.random() * Math.floor(max));
        this.push(number.toString());
        this.push(null);
    }
});

const addRandomNumber = new Transform({
    transform(chunk, encoding, callback) {
        const max = 1000;
        const number = Math.floor(Math.random() * Math.floor(max));
        const result = parseInt(chunk, 10) + number;
        this.push(result.toString());
        callback();
    }
});

const outStream = new Writable({
    write(chunk, encoding, callback) {
        console.log(chunk.toString());
        callback();
    }
});

inStream.pipe(addRandomNumber).pipe(outStream);