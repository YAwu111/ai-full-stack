// 标准的Promise A+ 实现 示例
class MyPromise {
    static PENDING = "pending";
    static FULFILLED = "fulfilled";
    static REJECTED = "rejected";

    constructor(executor) {
        this.state = MyPromise.PENDING;
        this.value = null;
        this.fulfilledCallbacks = [];
        this.rejectedCallbacks = [];

        const resolve = (value) => {
            queueMicrotask(() => this._resolvePromise(value));
        };
        const reject = (reason) => {
            queueMicrotask(() => this._reject(reason));
        };

        try {
            executor(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }

    _resolvePromise(value) {
        if (this.state !== MyPromise.PENDING) return;

        // 如果 value 是自己，抛出循环链错误
        if (value === this) {
            return this._reject(new TypeError("Chaining cycle detected"));
        }

        // 如果 value 是 thenable
        if (value && (typeof value === "object" || typeof value === "function")) {
            let then;
            try {
                then = value.then;
            } catch (err) {
                return this._reject(err);
            }

            if (typeof then === "function") {
                // 调用 thenable 的 then，绑定 value
                let called = false;
                try {
                    then.call(
                        value,
                        (v) => {
                            if (called) return;
                            called = true;
                            this._resolvePromise(v);
                        },
                        (r) => {
                            if (called) return;
                            called = true;
                            this._reject(r);
                        }
                    );
                    return;
                } catch (err) {
                    if (!called) {
                        return this._reject(err);
                    }
                }
            }
        }

        this.state = MyPromise.FULFILLED;
        this.value = value;
        this.fulfilledCallbacks.forEach((cb) => cb(value));
    }

    _reject(reason) {
        if (this.state !== MyPromise.PENDING) return;
        this.state = MyPromise.REJECTED;
        this.value = reason;
        this.rejectedCallbacks.forEach((cb) => cb(reason));
    }

    then(onFulfilled, onRejected) {
        // 值穿透和错误穿透
        onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v;
        onRejected =
            typeof onRejected === "function"
                ? onRejected
                : (err) => {
                      throw err;
                  };

        const nextPromise = new MyPromise((resolve, reject) => {
            const handleCallback = (callback) => {
                queueMicrotask(() => {
                    try {
                        const x = callback(this.value);
                        // 如果返回的是 Promise 或 thenable，采用它的状态
                        if (x === nextPromise) throw new TypeError("Chaining cycle detected");
                        if (x instanceof MyPromise) {
                            x.then(resolve, reject);
                        } else if (
                            x &&
                            (typeof x === "object" || typeof x === "function") &&
                            typeof x.then === "function"
                        ) {
                            x.then(resolve, reject);
                        } else {
                            resolve(x);
                        }
                    } catch (err) {
                        reject(err);
                    }
                });
            };

            if (this.state === MyPromise.PENDING) {
                this.fulfilledCallbacks.push(() => handleCallback(onFulfilled));
                this.rejectedCallbacks.push(() => handleCallback(onRejected));
            } else if (this.state === MyPromise.FULFILLED) {
                handleCallback(onFulfilled);
            } else if (this.state === MyPromise.REJECTED) {
                handleCallback(onRejected);
            }
        });

        return nextPromise;
    }

    catch(onRejected) {
        return this.then(undefined, onRejected);
    }

    finally(callback) {
        return this.then(
            (value) => {
                return MyPromise.resolve(callback()).then(() => value);
            },
            (reason) => {
                return MyPromise.resolve(callback()).then(() => {
                    throw reason;
                });
            }
        );
    }

    // 静态方法
    static resolve(value) {
        if (value instanceof MyPromise) return value;
        return new MyPromise((resolve) => resolve(value));
    }

    static reject(reason) {
        return new MyPromise((_, reject) => reject(reason));
    }

    static all(promises) {
        return new MyPromise((resolve, reject) => {
            const results = [];
            let completed = 0;

            promises.forEach((p, i) => {
                MyPromise.resolve(p).then(
                    (value) => {
                        results[i] = value;
                        completed++;
                        if (completed === promises.length) resolve(results);
                    },
                    (err) => reject(err)
                );
            });

            if (promises.length === 0) resolve([]);
        });
    }

    static race(promises) {
        return new MyPromise((resolve, reject) => {
            promises.forEach((p) => {
                MyPromise.resolve(p).then(resolve, reject);
            });
        });
    }
}