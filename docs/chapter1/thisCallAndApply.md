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
```javaScript
var MyClass = function() {
    this.name = 'sven';
}

var obj = new MyClass();
alert ( obj.name );
```

4. Function.prototype.call 或 Function.prototype.apply调用
```javaScript
var obj1 = {
    name: 'sven',
    getName: function() {
        return this.name
    }
};

var obj2 = {
    name: 'anne'
};

console.log( obj1.getName() ); // 输出: sven
console.log( obj1.getName.call( obj2 ) ); // 输出：anne
```

### 丢失的this
```javaScript
var obj = {
    myName: 'sven',
    getName: function(){
        return this.myName;
    }
};

console.log( obj.getName() ); // 输出：'sven'

var getName2 = obj.getName;
console.log( getName2() ); // 输出：underfined
```

## call和apply
### call和apply的区别
- 看看用法就知道了
```javaScript
var func = function( a, b, c ) {
    alert( [ a, b, c ] ); // 输出 [ 1, 2, 3 ]
};

func.apply( null, [ 1, 2, 3 ] );
```
```javaScript
var func = function( a, b, c ){
    alert( [ a, b, c ] );   // 输出 [ 1, 2, 3 ]
};

func.call( null, 1, 2, 3 );
```
### call和apply的用途
1. 改变`this`指向
```javaScript
var obj1 = {
    name: 'sven'
};

var obj2 = {
    name: 'anne'
};

window.name = 'window';

var getName = function(){
    alert ( this.name );
};

getName(); // 输出：window
getName.call( obj1 ); // 输出：sven
getName.call( obj2 ); // 输出: anne
```

2. Function.prototype.bind
- 没有源生的bind的时候可以自己实现
- 简单的方法
```javaScript
Function.prototype.bind = function( context ){
    var self = this;  // 程序原函数
    return function() { // 返回一个新的函数
        return self.apply( context, arguments ); // 执行新的函数的时候，会把之前传入的context
                                                 // 当作新函数体内的this
    }
};

var obj = {
    name: 'sven'
};

var func = function() {
    alert( this.name ); // 输出： sven
}.bind(obj);

func();
```
- 完整的方法
```javaScript
Function.prototype.bind = function(){
    var self = this,  // 程序原函数
        context = [].shift.call( arguments ),  // 需要绑定的this上下文
        args = [].slice.call( arguments );     // 剩余的参数转成数组
    return function() { // 返回一个新的函数
        return self.apply( context, [].concat.call( args, [].slice.call( arguments ) ) );
            // 执行新的函数的时候，会把之前传入的 context 当作新函数体内的this
            // 并且组合两次分别传入的参数，作为新函数对的参数
    }
};

var obj = {
    name: 'sven'
};

var func = function( a, b, c, d ) {
    alert( this.name ); // 输出： sven
    alert( [a, b, c, d] ); // 输出: [ 1, 2, 3, 4 ]
}.bind(obj, 1, 2);

func( 3, 4 );
```

3. 借用其他对象的方法
- 借用构造函数
```javaScript
var A = function( name ) {
    this.name = name;
};

var B = function() {
    A.apply( this, arguments );
};

B.prototype.getName = function() {
    return this.name;
};

var b = new B( 'sven' );
console.log( b.getName() ); // 输出: 'sven'
```

- 非数组的借用数组的方法
```javaScript
(function(){
    Array.prototype.push.call( arguments, 3 );
    console.log ( arguments ); // 输出[1,2,3]
})( 1, 2 );
```
- 可以借用的前提条件
    + 对象本身要可以存取属性
    + 对象的 `length` 属性可读写