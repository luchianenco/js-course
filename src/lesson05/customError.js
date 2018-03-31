class LogicError extends Error {
    constructor(...args) {
        super(...args);
        Error.captureStackTrace(this, LogicError);
    }
}

process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' + err);
    console.log(err.stack);
});

console.log('testing custom error');
throw new LogicError('Logic Exception');