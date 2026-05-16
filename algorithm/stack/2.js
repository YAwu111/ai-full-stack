const stack = [];
// 入栈
stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);
console.log(stack);
// 出栈
stack.pop();
console.log(stack);
// 查看栈顶元素
const peek = stack[stack.length - 1];
console.log(peek);
// 查看栈的长度
console.log(stack.length);

// 栈是否为空
const isEmpty = stack.length === 0;