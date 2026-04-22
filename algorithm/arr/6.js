const obj = {
    name:'将过问',
    age:18,
    hobbies:['篮球','足球','跑步']
}
for(let key in obj){
    console.log(key);
}
// 数组也是对象
const arr = [1,2,3,4,5,6]
for(let key in arr){
    console.log(key,arr[key]);
}