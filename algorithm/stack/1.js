// 数组是一种开箱即用的线性数据结构(连续存储)
const arr = [1,2,3,4,5];

arr.push(6);
arr.unshift(0);
console.log(arr);
arr.pop(); // 删除数组最后一个元素
arr.shift(); // 删除数组第一个元素
console.log(arr);