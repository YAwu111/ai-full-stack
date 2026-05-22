// Cat大写，开发约定 是类
// name color 是模板  抽象，封装的特性在显现
var Cat = {
    name:"",
    color:"",
}

var cat1 = {}; //空对象
cat1.name = '几个';
cat1.color = '橘色';

var cat2 = {};
cat2.name = '小宝';
cat2.color = '白色';
// 比较麻烦(函数封装实例化的过程),没什么关系

// __proto__
// prototype
// constructor