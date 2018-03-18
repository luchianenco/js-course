class LogicError extends Error {
    constructor(...args) {
        super(...args);
        Error.captureStackTrace(this, LogicError);
    }
}

console.log('testing custom error');
throw new LogicError('Logic Exception');