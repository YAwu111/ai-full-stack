// forEach
const arr = [1,2,3,4,5,6];
// 不能break 
// 函数入栈出栈 性能差
arr.forEach((item,index) =>{
    console.log(item,index);
})