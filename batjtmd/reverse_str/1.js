function reverseStr(str){
    // 数组可以反转,通过split切割成字符数组
    // 通过数组join拼接成字符串
    return str.split('').reverse().join('');
}

console.log(reverseStr('qwer'));