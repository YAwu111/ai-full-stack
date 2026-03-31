const PI = 3.1415926;
const person = {
    name: "ysw",
    age:28
};
// person = "hahaha"; 报错
person.age = 18;//可变
console.log(person.age);
// 简单数据类型的常量是不能改变的
//复杂数据类型的常量,不能改变引用地址,但是可以改变引用地址中的属性值
// 如果对象一定不能改变呢?
const wes = Object.freeze(person);
console.log(wes);// {name: 'ysw', age: 18}
wes.age = 17;
console.log(wes);// {name: 'ysw', age: 18}