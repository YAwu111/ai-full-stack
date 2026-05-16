// 链表来实现栈

class ListNode{
    constructor(val,next){
        this.val = val;
        this.next = next;
    }
}

class LinkedListStack{
    #stackPeek;
    #size =0;
    constructor(){
        // 初始化栈顶指针为空
        this.#stackPeek = null;
    }
    push(val){
        const node = new ListNode(val,this.#stackPeek);
        this.#stackPeek = node;
        this.#size++;
    }
    pop(){
        this.#size--;
        const val = this.#stackPeek.val;
        this.#stackPeek = this.#stackPeek.next;
        return val;
    }
    getSize(){
        return this.#size;
    }

    get size(){
        return this.#size;
    }
    getPeek(){
        return this.#stackPeek.val;
    }
    isEmpty(){
        return this.#size === 0;
    }
    toArray(){
        const arr = [];
        let currentNode = this.#stackPeek;
        while(currentNode){
            arr.unshift(currentNode.val);
            currentNode = currentNode.next;
        }
        return arr;
    }
}

const stack = new LinkedListStack();

stack.push(1);
stack.push(2**3.7);
stack.push(3**2.1);
console.log(stack.getSize());
console.log(stack.getPeek());
console.log(stack.toArray());
console.log(stack.pop());
console.log(stack.size);
console.log(stack.toString());
