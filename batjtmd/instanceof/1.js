function Animal(){

}

function Person(){

}
Person.prototype = new Animal()
const p = new Person()
console.log(p instanceof Person)
console.log(p instanceof Animal)