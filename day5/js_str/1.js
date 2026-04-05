// 坚持一种风格，或者公司代码的风格
// 两者无区别
let str = 'helloworld';
let str1 = 'hello world';
// es6 模板字符串
// 其他大型语言都有字符串模板功能， JS不再去用字符串拼接
let  str3 = `hello world`;
let w = 'world';
let str4 = 'hello '+ w;// es5
let str_ = `hello ${w}`;// es6
//String类 | string 类型
// 实例化字符串对象
let str5 = new String('abc');// 是一个对象
console.log(typeof str5,
    str5,
    typeof str4,
    str5.valueOf(),
    Object.prototype.toString.call(str5)
);
// 为什么str4是一个简单数据类型却可以用length函数？
console.log(str4.length,str5.length);
