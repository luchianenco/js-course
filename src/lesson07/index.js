const series = require('./src/series');

const seriesA = (next) => {
    console.log('A');
    next();
};

const seriesB = (next) => {
    console.log('B');
    next();
};

const seriesC = (next) => {
    console.log('C');
    next();
};

series(seriesA, seriesB, seriesC);