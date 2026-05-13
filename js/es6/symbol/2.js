const s1 = Symbol('二哈');
const s2 = Symbol('二哈')
console.log(s1 == s2);

const secretKey = Symbol('secret');

// 多人写作中 Why Symbol?
// 动态 不太安全？
// key string 类型 | Symbol 类型
const a = 'ecut'
const user = {
    [secretKey]:'11112222',
    email:'123155@163.com',
    name:'草威威',
    company:'字节',
    [a]:123
}

console.log(user[a]);

console.log(user[secretKey]);

user.email = 'weiwei@qq.com';

