// 如何一次性声明多个变量
// let a=1,b=2,c=3;
// 数组结构赋值
// let [a,b,c] = [1,2,3];
// console.log(a,b,c);
// 非一维数组 嵌套数组
// const arr = [1,[2,3,[4],5]];
// const [a,[b,c,[d],e]] = arr;
// console.log(a,b,c,d,e);

// const arr = [1,2,3,4,5];
// // arr[0] a
// // 余下的 数组, b
// const [a,...b] = arr;
// console.log(a,b);

// const users = ['Darvin Ham', 'James', 'Luka', 'Davis', 'Ayton', '田田'];
// // 左右一致
// const [captain,...players] = users;
// console.log(captain,players);

// const sex = 'boy';
// const obj = {
//     name:'cjz',
//     age:18,
//     sex,
//     like:{
//         n:'唱跳'
//     }
// };
// // let name = obj.name;
// // 一次性结构一个对象
// // 只要左右一致 , [],{} 都能解开
// let {name,age,like:{n}} = obj;
// console.log(name,age,n);
// const [m,...t] = 'hello';
// console.log(m,t);
const {length} = 'hello';
console.log(length);