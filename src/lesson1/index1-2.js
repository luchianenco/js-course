const Object = {
    create: function(proto) {
        if (typeof proto !== 'object' && typeof proto !== 'function' ) {
            throw new Error('Object prototype may be only type of object, given type of ' + typeof proto);
        }

        function Fn() {};
        Fn.prototype = proto;
        
        return new Fn()
    }
}