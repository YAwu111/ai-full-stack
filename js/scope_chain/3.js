// 闭包特殊的地方

function foo(){
    var myName  = '即可时间';
    let test1 = 100;
    const test2 = 2;
    var innerBar = {
        getName:function(){
            console.log(test1);
            return myName;
        },
        setName:function (newName){
            myName = newName;
        }
    };
    // return 可以被外部访问
    return innerBar; // 闭包形成的条件 函数嵌套函数
}

var bar = foo();
bar.setName('即可帮'); // setName 执行上下文创建 
bar.getName();
console.log(bar.getName());