function Cat(name,color){
    // this 由运行的时候决定的
    this.name = name;
    this.color = color;
};

Cat('黑猫警长','黑色');

console.log(name,color);

var cat1 = new Cat('键帽','白色');
console.log(cat1.name,cat1.color);
