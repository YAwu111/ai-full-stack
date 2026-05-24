# 手写instanceof

- 原型和原型链
- 实例判断运算符  其他OOP 语言
- 原型关系判断运算符  本质
  - A instanceof B
    - A 的原型链上是否有 B 的原型

- 需求
  - 大型项目，多人协作
  搞不清楚对象上有哪些属性和方法，
  instanceof 有必要

## 继承的方式
本质就是父类的属性和方法，子类也能有
- 构造函数绑定继承
  call/apply 
- prototype模式
  - 父类的实例作为子类的原型
  - 子类的原型的constructor 再指回子类
- 利用空对象作为中介