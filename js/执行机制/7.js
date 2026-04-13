let str = 'hello'; // 简单数据类型
let str2=str; // 值的拷贝
str2='nihao';
console.log(str,str2);
console.log(str.length);
let obj ={ // 复杂数据类型 对象
    name:'name',
    age:18
};
let obj2 = obj; // 引用式拷贝
obj2.age++;
console.log(obj2,obj);
// 变量申请内存空间 不同变量类型申请的内存空间 不同
// 简单数据类型 内存空间 栈内存 赋予值
// 复杂数据类型 内存空间 堆内存 赋予地址