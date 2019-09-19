# 闭包和高阶函数

## 闭包
- 学JavaScript必须知道闭包

### 变量的作用域
```javaScript
var func = function() {
    var a = 1;
    alert ( a );    // 输出：1
};

func();
alert( a );   // 输出： Uncaught ReferenceError: a is not defined
```

```javaScript
var a = 1;

var func1 = function() {
    var b = 2;
    var func2 = function(){
        var c = 3;
        alert( b );         // 输出： 2
        alert( a );         // 输出： 1
    }
    func2();
    alert( c );             // 输出： Uncaught ReferenceError: c is not defined
};

func1();
```

### 变量的生存周期
- 闭包
```javaScript
var func = function(){
    var a = 1;
    return function(){
        a++;
        alert( a );
    }
};

var f = func();

f();  // 输出： 2
f();  // 输出： 3
f();  // 输出： 4
f();  // 输出： 5
```


### 闭包的更多作用

1. 封装变量
```javaScript
var mult = (function(){
    var cache = {};
    return function(){
        var args = Array.prototype.join.call( arguments, ',' );
        if ( args in cache ) {
            return cache[ args ];
        }
        var a = 1;
        for ( var i = 0 l = arguments.length; i < l; i++ ){
            a = a * arguments[i]
        }
        return cache[ args ] = a;
    }
})();
```
2. 延续局部变量的寿命

### 闭包和面向对象设计
- 面向对象的设计中很多都需要用到闭包

### 用闭包实现命令模式
```javaScript
var Tv = {
    open: function(){
        console.log( '打开电视机' );
    },
    close: function(){
        console.log( '关闭电视机' );
    }
};

var createCommand = function( receiver ){

    var execute = function(){
        return receiver.open();  // 执行命令， 打开电视机
    }

    var undo = function(){
        return receiver.close(); // 执行命令，关闭电视机
    }

    return {
        execute: execute,
        undo: undo
    }
};

var setCommand = function( command ){
    document.getElementById( 'execute' ).onclick = function(){
        command.execute();   // 输出：打开电视机
    }
    document.getElementById( 'unde' ).onClick = function(){
        command.undo();
    }
};

setCommand( createCommand( Tv ) );
```

### 闭包与内存管理
- 闭包容易造成内存泄漏，使用完记得把变量设置成NULL


## 高级函数
- 成为高阶函数的条件
    + 函数可以作为参数被传递
    + 函数可以作为返回值输出

### 函数作为参数被传递
1. 回调函数
2. Array.prototype.sort

### 函数作为返回值输出
1. 判断数据类型
```javaScript
var isString = function(obj) {
    return Object.prototype.toString.call( obj ) === '[object String]';
}
```
2. getSingle
```javaScript
var getSingle = function( fn ) {
    var ret;
    return function() {
        return ret || (ret = fn.apply( this, arguments ) );
    };
};
```

### 高阶函数实现AOP
