function promiseReduce(tasks, sumFn, startValue) {
    return tasks.reduce((promiseChain, currentTask) => {
        return promiseChain.then(chainResults =>
            currentTask().then(currentResult =>
                [...chainResults, currentResult]
            )
        );
    }, Promise.resolve([])).then(results => {
        let sum = results.reduce((acc, value) => {
            return acc + value + startValue;
        }, 0);
        return sumFn(sum);
    });
}


let promise0 = () => Promise.resolve(0),
    promise1 = () => Promise.resolve(1),
    promise2 = () => Promise.resolve(2);

let sumFn = (sum) => {
    return Promise.resolve(sum);
};

promiseReduce([promise0, promise1, promise2], sumFn, 0).then(res => console.log(res));