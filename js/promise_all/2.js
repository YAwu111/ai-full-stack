
function Person(name,age){
    this.name = name;
    this.age = age;
}

Person.prototype.specie = '人类';
let zhen = new Person('正宗',10);
console.log(zhen.specie);

const kong = {
    name:'孔子',
    hobbies:['读书','写作','旅游']
}

zhen.__proto__ = kong;

console.log(zhen.hobbies);