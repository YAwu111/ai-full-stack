const arr = [1,2,3,4,5];
const sum = arr.reduce((sum,n) => sum+n,0);
// reduce本质是一个累积器，累加只是展现的功能形式
console.log(sum);


//reduce方法第二个参数表示，第一个传入方法的累积值的初始值
function reverseStr(str){
    return [...str].reduce((reversed,char) => char + reversed, '');
}

console.log(reverseStr('qwer'));