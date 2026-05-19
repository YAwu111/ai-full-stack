const MiniStack = function() {
    this.stack = [];
    this.stack2 = [];
  }
  MiniStack.prototype.push = function(x) {
    this.stack.push(x);
    if (this.stack.length === 0 || 
      this.stack2[this.stack2.length - 1] >= x) {
      this.stack2.push(x); // 单调栈
    }
  } 
  MiniStack.prototype.pop = function() {
    if (this.stack.pop() == this.stack2[this.stack2.length-1]) {
      this.stack2.pop();
    }
  }
  MiniStack.prototype.top = function() {
    return this.stack[this.stack.length - 1];
  }
  MiniStack.prototype.getMin = function() {
    return this.stack2[this.stack2.length - 1];
  }