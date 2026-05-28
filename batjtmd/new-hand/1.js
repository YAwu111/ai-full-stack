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
function add () {
  // let result = 0;
  // // length arguments[i] 数组
  // for (let i = 0; i < arguments.length; i++) {
  //   result += arguments[i];
  // }
  // return result;
  // console.log(arguments.__proto__);
  // return arguments.reduce(((prev, cur) => prev + cur),0)
  // console.log(JSON.stringify(arguments));
  // console.log(JSON.stringify([1,2,3]));
  // const args = [...arguments]
  // console.log(args, 
  //   Object.prototype.toString.call(args),
  //   args instanceof Array
  // )
  
}
console.log(add(1,2));
console.log(add(1,2,3));
console.log([1,2,3,4,5,6].reduce((prev,cur) => prev + cur, 0))