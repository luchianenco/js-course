const series = require('../src/series');

test('test series exists', () => {
    expect(typeof series).toBe('function')
});


test('test each argument function is called once', () => {
    const A = jest.fn().mockImplementation((next) => {
        next();
    });
    const B = jest.fn().mockImplementation((next) => {
        next();
    });
    series(A, B);
    expect(A.mock.calls.length).toBe(1);
    expect(B.mock.calls.length).toBe(1);
});

test('test next function with false in 2nd function', () => {
    const A = jest.fn().mockImplementation((next) => {
        next();
    });

    const B1 = jest.fn().mockImplementation((next) => {
        next(false);
    });

    const B2 = jest.fn().mockImplementation((next) => {
        next();
    });

    const C = jest.fn().mockImplementation((next) => {
        next();
    });

    series(A, B1, B2, C);
    expect(A.mock.calls.length).toBe(1);
    expect(B1.mock.calls.length).toBe(1);
    expect(B2.mock.calls.length).toBe(0);
    expect(C.mock.calls.length).toBe(1);
});
