class MyPromise{
    constructor(fn){
        this.state = 'pending';
        this.value = null;
        this.fulfilledCallback = [];
        this.rejectedCallback = [];
        fn(this.resolve,this.reject);
    }

    resolve = value =>{
        if(this.state === 'pending'){
            this.value = value;
            this.state = 'fulfilled';
            const callbacks = this.fulfilledCallback.slice();
            this.fulfilledCallback = [];
            for(let i=0;i<callbacks.length;i++){
                queueMicrotask(()=>callbacks[i](value));
            }
            return this;
        }
        else throw new Error('state already over pending state');
    }
    
    reject = value =>{
        if(this.state === 'pending'){
            this.value = value;
            this.state = 'rejected';
            const callbacks = this.rejectedCallback.slice();
            this.rejectedCallback = [];
            for(let i=0;i<callbacks.length;i++){
                queueMicrotask(()=>callbacks[i](value));
            }
            return this;
        }
        else throw new Error('state already over pending state');
    }

    then(onFulfilled,onRejected){
        if(typeof onFulfilled !== 'function'){onFulfilled = value => value};
        if(typeof onRejected !== 'function') { onRejected = error => {throw error} };
        const nextPromise = new MyPromise((resolve,reject)=>{
            if(this.state === 'pending'){
                this.fulfilledCallback.push(()=>{
                    this.executorTryAndCatch(onFulfilled,resolve,reject,this.value,nextPromise);
                });
                this.rejectedCallback.push(()=>{
                    this.executorTryAndCatch(onRejected,resolve,reject,this.value,nextPromise);
                });
            }
            else if(this.state === 'fulfilled'){
                queueMicrotask(()=>{
                    this.executorTryAndCatch(onFulfilled,resolve,reject,this.value,nextPromise);
                });
            }
            else {
                queueMicrotask(()=>{
                    this.executorTryAndCatch(onRejected,resolve,reject,this.value,nextPromise);
                })
            }
        })
        return nextPromise;
    }

    catch(onRejected){
        return this.then(null,onRejected);
    }

    executorTryAndCatch(onFunction,resolve,reject,value,nextPromise){
        try{
            const res = onFunction(value);
            if(res === nextPromise) throw new TypeError('Chaining cycle error');
            if(res instanceof MyPromise) res.then(resolve,reject);
            else resolve(res);
        }catch(err){
            reject(err);
        }
    }
}

const a =new MyPromise((resolve,reject) =>{
    reject(1);
})
const  t = a.catch(res => {
    res++;
    console.log(res+"---------1");
    return res;
});
t.then(res=>{res++
    console.log(res+"---------2");
    return res;
})
    .then(res => {
        res = res**2;
        console.log(res+"---------3");
        return res;
    })
    .then(res =>{
        res = res*2;
        console.log(res+"---------4");
        return res;
    })
console.log(1);