# this、call和apply
- 简单介绍

## this
- this是在运行时动态绑定的

### this 的指向
- this指向4中情况
    + 作为对象的方法调用
    + 作为普通函数调用
    + 构造器调用
    + Function.prototype.call 或 Function.prototype.apply调用

1. 作为对象的方法调用
```javaScript
var obj = {
    a: 1,
    getA: function(){
        alert( this === obj ); // 输出： true
        alert( this.a ); // 输出： 1
    }
};

obj.getA();
```

2. 作为普通函数调用
```javaScript
window.name = 'globalName';

var getName = function(){
    return this.name;
};

console.log( getName() ); // 输出：globalName
```
或者
```javaScript
window.name = 'globalName';

var myObject = {
    name: 'sven',
    getName: function(){
        return this.name;
    }
};

var getName = myObject.getName;
console.log( getName() ); // gobalName
```

3. 构造器调用


4. Function.prototype.call 或 Function.prototype.apply调用