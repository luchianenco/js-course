Object.create = function(proto, propertiesObject) {
    if (typeof proto !== 'object' && typeof proto !== 'function' ) {
        throw new Error('Object prototype may be only type of object, given type of ' + typeof proto);
    }

    if (typeof propertiesObject !== 'object' && typeof propertiesObject !== 'function' ) {
        throw new Error('Object Properties may be only type of object, given type of ' + typeof propertiesObject);
    }

    propertiesObject.__proto__ = proto;

    return propertiesObject;
};