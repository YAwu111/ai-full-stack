function MyNew(Constructor,...args){
    const obj = Object.create(Constructor.prototype);
    const res = Constructor.apply(obj,args);
    if(res !==null&&(typeof res === 'function' || typeof res === 'object')) return res;
    return obj;
}