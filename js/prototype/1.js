// es5 没有类class
// JS中函数是一等对象
// 首字母大写的 作为构造函数
function Car(color){
    this.color = color;
    // 车的参数
    // this.name = 'su7';
    // this.height = 1.4;
    // this.weight = 1.5;
    // this.long = 4800;
}

Car.prototype={
    drive(){
        console.log('drive');
    },
    name : 'su7',
    long : 4800,
    height : 1.4,
    weight : 1.5
}

const car1 = new Car('霞光紫');
console.log(car1,car1.name,car1.long);
const car2 = new Car('海湾蓝');
console.log(typeof car2);

car1.drive();