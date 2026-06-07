"use strict";
let a = 1;
let b = a.toString();
console.log(typeof a);
console.log(typeof b);
let arr = [1, 2, 3];
let MyString = ['a', 'b', 'c', 'd'];
let array = [1, '1', 2];
let arr2 = ['a', 'b'];
// ts 借鉴了java 
// 枚举类型
var Status;
(function (Status) {
    Status[Status["Pending"] = 0] = "Pending";
    Status[Status["Fulfilled"] = 1] = "Fulfilled";
    Status[Status["Rejected"] = 2] = "Rejected";
})(Status || (Status = {}));
let s = Status.Pending;
s = Status.Fulfilled;
console.log(s);
console.log(Status[s]);
console.log(Status[0]);
// 类型注解 只能在变量声明时使用且只能使用一次
let aa = 1;
aa = '11';
aa = {};
let bb = 1;
bb = 'b';
bb = {
    name: 'a',
    age: 18
};
// unknow 不能调用
// bb.name;
let user2 = {
    name: 'a',
    age: 18
};
const u = {
    id: 1,
    name: 'a',
    age: 18,
    sex: 'male',
    email: 'a@qq.com'
};
let arr3 = ['1', '2', '3'];
let arr4 = arr3.map(item => parseInt(item));
console.log(arr4);
