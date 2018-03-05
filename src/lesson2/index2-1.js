export function getPath(node) {
    if (! node instanceof Element) {
        throw new Error('Provided node should be an instance of Element class, given ' + node.constructor.name);
    }

    let nodePath = [];

    const nodeBubling = function(currentNode, nodePath) {
        if (currentNode.localName !== 'body') {

            const nodeInfo = { name: currentNode.localName };
            if (currentNode.getAttribute('id')) {
                nodeInfo.id = currentNode.getAttribute('id');
            }
            if (currentNode.getAttribute('class')) {
                nodeInfo.class = currentNode.getAttribute('class');
            }

            nodeInfo.childIndex = [].indexOf.call(currentNode.parentNode.children, currentNode);
            nodeInfo.childIndex++;

            nodePath.push(nodeInfo);
            return nodeBubling(currentNode.parentElement, nodePath);
        }
    };

    const printPath = function(nodePath) {
        if (! Array.isArray(nodePath)) {
            throw new Error('Provided argument values should be type of array, given ' + typeof nodePath);
        }

        if (nodePath.length <= 0) {
            throw new Error('Provided array has no elements');
        }

        let path = '';
        for (let i = nodePath.length - 1; i >= 0; i--) {
            path += nodePath[i].name;
            if (nodePath[i].hasOwnProperty('id')) {
                path += '#' + nodePath[i].id;
            } else if (nodePath[i].hasOwnProperty('class')) {
                path += '.' + nodePath[i].class;
                path += ':nth-child(' + nodePath[i].childIndex + ')';
            } else {
                path += ':nth-child(' + nodePath[i].childIndex + ')';
            }
            if (i > 0) {
                path += ' > ';
            }
        }

        return path;
    };

    nodeBubling(node, nodePath);
    console.log(printPath(nodePath));
    console.log(document.querySelector(printPath(nodePath)));
}
