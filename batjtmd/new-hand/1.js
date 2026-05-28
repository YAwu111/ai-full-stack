function myNew(ClassName,...args){
    const obj = {};
    obj.__proto__ = ClassName.prototype;
    const result = ClassName.call(obj,...args);
    return (result !== null &&
        (typeof result === 'object' || typeof result === 'function')) ? result : obj;
}

function add(...args){
    return args.reduce((acc,curr)=>acc+curr,0);
}