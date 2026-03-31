//早期的JS就单纯用来页面交互,有一些缺失甚至设计不合理的地方
//语言精辟,The Good Parts,The Bad Parts
// es5 只有var 声明变量,没有常量
var age = 18;//js 弱类型,由值据决定
// age = '18'
age ++;
var PI = 3.1415926;//通过约定变量名大写是常量
console.log(age);
//es6 2015年 js 为了像java/c++大型语言,企业级开发项目 开发了es6
//建议不要再用var了,直接用let
let height = 188;
height++;
console.log(height);
const key = 'abc123';//不能赋值.
