function foo(){
    var a = {name:'杰克时间'};
    var b = a;
    b.name = '时间'; // 引用式拷贝
    console.log(a.name,b.name);
}
foo();