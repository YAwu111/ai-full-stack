// js 不适合做大量运算
// 精度会丢失 最大2^53-1 64位存储数据
// 第一位符号位 第十一位 指数 后52位 尾数
let num = 1234567890987654321n;
console.log(num,typeof num);
// console.log(Number.MAX_SAFE_INTEGER);
// ** 指数运算符 es7
console.log(2 ** 10);