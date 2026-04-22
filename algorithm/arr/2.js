const arr = (new Array(6)).fill(0);
const len = arr.length;
// 计数循环 与cpu工作很契合
// 遍历数组方法无数 ， 计数循环性能最好
//  for(int i=0;i<arr.length;i++) arr.length 每次调用都会发起一次RSH查询,开销比读取一个
// 简单数据类型大
for(let i=0;i<len ; i++){
    console.log(arr[i]);
}