let a ;
console.log(a,typeof a);
console.log(typeof null);
//没有给变量赋值,类型无法确定
//null表示一个空值,类型是object
let b = '爸爸';
b = null;
// 主动赋值给变量表示变量为空值
let obj = {
    name:'今天扫码',
};
console.log(obj.yuema,typeof obj.yuema)
// 未定义对象属性JS自动定义为undefined
