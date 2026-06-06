Function.prototype.MyBind = function (target,...args){
    const fn = this;
    function bound(...PreixArgs){
        const isNew = this instanceof bound;
        const MyThis = isNew ? this : target;
        const result = fn.apply(MyThis,[...args,...PreixArgs]);
        if(isNew && (result !== null && (typeof result === 'function' || typeof result === 'object')))
            return result;
        else return isNew ? MyThis : result;
    };
    bound.prototype = Object.create(fn.prototype);
    bound.prototype.constructor = bound;
    return bound;
}