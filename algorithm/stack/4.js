// 用连续存储的数组来实现栈功能
class ArrayStack{
    #stackPeek;
    #size = 0;
    constructor(){
        this.#stackPeek = [];
    }
    push(val){
        this.#stackPeek.push(val);
        this.#size++;
    }
    pop(){
        this.#size--;
        return this.#stackPeek.pop();
    }
    getSize(){
        return this.#size;
    }
    getPeek(){
        return this.#stackPeek[this.#size - 1];
    }
    isEmpty(){
        return this.#size === 0;
    }
    toArray(){
        return this.#stackPeek;
    }
}

const stack = new ArrayStack();
stack.push(1);
stack.push(2);
console.log(stack.getPeek());