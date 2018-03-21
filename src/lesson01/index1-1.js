var curry = function (val) {
    var acc = val;

    var inner = function (nextVal) {
        if (arguments.length) {
            acc += nextVal;
        } else {
            console.log(acc);
        }
      return inner;
    };

    return inner;
  };

  curry(1)(2)(4)();