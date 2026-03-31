#var_let_const

- js 里面如何声明变量？
    let 声明变量
    var 声明变量 
        var 声明的变量 var a=1; 分为了两部分来执行var a;在代码一开始就可以访问"变量提升"编译阶段就发生了,执行阶段才会赋值,不符合直觉.
    const 声明常量
## 报错的集合
- ReferenceError : variable is not defined
  作用域外调用
- TypeError: Assignment to constant variable.
  赋值给常量
- ReferenceError: Cannot access 'variable_name' before initialization
  提前访问了暂时性死区(Dead Zone)的变量

- hot 100 6-10题目
- 你不知道的jvascript 1-2章写一篇学习笔记文章