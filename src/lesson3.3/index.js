export function intersect(node1, node2) {
    if (! node1 instanceof Element) {
        throw new Error('Provided node should be an instance of Element class, given ' + node1.constructor.name);
    }

    if (! node2 instanceof Element) {
        throw new Error('Provided node should be an instance of Element class, given ' + node2.constructor.name);
    }

    const e1 = node1.getBoundingClientRect();
    const e2 = node2.getBoundingClientRect();
    const result = !(
        e1.right < e2.left ||
        e1.left > e2.right ||
        e1.bottom < e2.top ||
        e1.top > e2.bottom
    );

    return result
}
