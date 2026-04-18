var users=[
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
]// json 数组 在堆内存中, 独立于users，data之外
// users,data都是对json数组的引用
var data = users;// data users都发生变量提升
data = JSON.parse(JSON.stringify(users));
data[0]["hobbies"]=["答复","应税"];
console.log(data,users)
console.log(typeof data[0]["hobbies"]);
