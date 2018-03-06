function promiseReduce(tasks, sumFn, startValue) {
    return tasks.reduce((promiseChain, currentTask) => {
        return promiseChain.then(chainResults =>
            currentTask().then(currentResult =>
                [...chainResults, currentResult]
            )
        );
    }, Promise.resolve([])).then(results => results.reduce(sumFn, startValue));
}


let promise0 = () => Promise.resolve(0),
    promise1 = () => Promise.resolve(1),
    promise2 = () => Promise.resolve(2);

let sumFn = (acc, value) => acc + value;

promiseReduce([promise0, promise1, promise2], sumFn, 10).then(res => console.log(res));