const users=[
    {
        id:1,
        name:"cjz",
        hometown:"南昌"
    },
    {
        id:2,
        name:"swy",
        hometown:"南昌"
    },
    {
        id:3,
        name:"wj",
        hometown:"进贤"
    }
]

users.push({
    id:4,
    name:"ch",
    hometown:"南昌"
})
let a=1;
let b=2;
let c=3;
// 存储在栈内存中
let d =a;// 值拷贝 复印(浅拷贝)
// 赋值操作没有完成值的拷贝
const data = users; // 引用式拷贝 堆内存开销大,
data[0].hobbies=["篮球","看烟花"];
console.log(data,users);