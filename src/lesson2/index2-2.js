function promiseReduce(tasks, sumFn, startValue) {
    return tasks.reduce((promiseChain, currentTask) => {
        return promiseChain.then(chainResults =>
            currentTask().then(currentResult =>
                [...chainResults, currentResult]
            )
        );
    }, Promise.resolve([])).then(results => {
        return sumFn(results, startValue);
    });
}


let promise0 = () => Promise.resolve(0),
    promise1 = () => Promise.resolve(1),
    promise2 = () => Promise.resolve(2);

let sumFn = (values, startValue = 0) => {
    let sum = startValue;
    values.forEach(value => {
        sum += value;
    });

    return Promise.resolve(sum);
};

promiseReduce([promise0, promise1, promise2], sumFn, 0).then(res => console.log(res));