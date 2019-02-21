function series(...options) {
    let cnt = 0;

    const next = function() {
        if (arguments.length > 0) {
            cnt = options.length - 2;
        }

        cnt++;
        if (typeof options[cnt] !== 'function') {
            return;
        }
        options[cnt](next);
    };

    options[cnt](next);

}

module.exports = series;