Object.create = function(proto){
    function Fn() {}
    Fn.prototype = proto
    return new Fn()
}