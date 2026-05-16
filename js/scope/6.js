function foo(){
    console.log(i);// undefined
    for(var i=0;i<10;i++){}
    console.log(i);// 10
}

foo();