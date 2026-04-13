// func();
// 由于let的存在 func的声明被存入的词法环境,无法被访问
// 所以提示声明问题报错
let func = ()=>{
    console.log('函数表达式不会提升');
}