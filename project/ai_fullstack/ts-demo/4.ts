let a:number = 1;
let b:string =a.toString();
console.log(typeof a);
console.log(typeof b);
let arr:number[] = [1,2,3];
let MyString:string[] = ['a','b','c','d'];
let array:[number,string,number]  = [1,'1',2];
let arr2:Array<string> = ['a','b'];

// ts 借鉴了java 
// 枚举类型
enum Status{
    Pending,
    Fulfilled,
    Rejected
}
let s:Status = Status.Pending;
s = Status.Fulfilled;
console.log(s);
console.log(Status[s]);
console.log(Status[0]);

// 类型注解 只能在变量声明时使用且只能使用一次
let aa:any = 1;
aa= '11';
aa = {};

let bb:unknown = 1;
bb= 'b';
bb = {
    name:'a',
    age:18
}
// unknow 不能调用
// bb.name;

let user2:{name:string,age:number} = {
    name:'a',
    age:18
}

interface User {
    readonly id:number;
    name:string;
    age:number;
    sex:'male'|'female';
    email:string;
    hobby?:string;
}

const u:User = {
    id:1,
    name:'a',
    age:18,
    sex:'male',
    email:'a@qq.com'
}

type abc = string[]|number[];
let arr3:abc = ['1','2','3'];
let arr4:abc = arr3.map(item => parseInt(item));
console.log(arr4);


