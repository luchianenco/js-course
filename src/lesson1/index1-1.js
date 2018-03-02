var curry = function (val) {
    var acc = val;

    var inner = function (nextVal) {
        if (nextVal) {
            acc += nextVal;
        } else {
            console.log(acc);
        }
      return inner;
    };

    return inner;
  };

  curry(1)(2)(4)();