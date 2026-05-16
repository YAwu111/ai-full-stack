const Hash = new Map();
Hash.set('(',')');
Hash.set('{','}');
Hash.set('[',']');
function isValid(s){
    const stack = [];
    for(const char of s){
        if(Hash.has(char)){
            stack.push(char);
        }
        else{
            if(stack.length === 0){
                return false;
            }
            const top = stack.pop(); 
            if(Hash.get(top) !== char) {
                return false;
            }           
        }
    }
    return stack.length === 0;
}
console.log(isValid('()'));
console.log(isValid('()[]{}'));
console.log(isValid('(]'));
console.log(isValid('([)]'));
console.log(isValid('{[]}'));
console.log(isValid('{((((((((((((((((((('));