# 单例模式
- 保证一个类只有一个实例，并提供它的全局访问点
- 用于对象只需要一个的时候
- 由于这个模式比较简单，不多做说明

## 单例模式的2种简单实现
```javaScript
var Singleton = function() {
    this.name = name;
}

Singleton.instance = null;
Singleton.prototype.getName = function() {
    alert( this.name );
}

Singleton.getInstance = function( name ) {
    if ( !this.instance ) {
        this.instance = new Singleton( name );
    }
    return this.instance;
}

var a = Singleton.getInstance( 'sven1' );
var b = Singleton.getInstance( 'sven2' );

alert( a===b );
```

## 单例的闭包实现
```javaScript
var Singleton = function() {
    this.name = name;
}

Singleton.prototype.getName = function() {
    alert( this.name );
}

Singleton.getInstance = (function() {
    var instance = null;
    return function (name) {
        if ( !instance ) {
            instance = new Singleton( name );
        }
        return instance;
    }
})();

var a = Singleton.getInstance( 'sven1' );
var b = Singleton.getInstance( 'sven2' );

alert( a===b );
```

## 透明的单例模式
```javaScript
/**
 * 透明的单例模式
 */
var CreateDiv = (function(){

    var instance;

    var CreateDiv = function( html ) {
        if ( instance ) {
            return instance
        }
        this.html = html;
        this.init();
        return instance = this;
    };

    CreateDiv.prototype.init = function(){
        var div = document.createElement( 'div' );
        div.innerHTML = this.html;
        document.body.appendChild( div );
    };

    return CreateDiv;
})();

var a = new CreateDiv( 'sven1' );
var b = new CreateDiv( 'sven2' );

alert( a === b );
```

## 用代理实现单例模式
```javaScript
/**
 * 用代理实现单例模式
 */
var CreateDiv = function( html ) {
    this.html = html;
    this.init();
}

CreateDiv.prototype.init = function() {
    var div = document.createElement( 'div' );
    div.innerHTML = this.html;
    document.body.appendChild( div );
}

var ProxySingletonCreateDiv = (function(){

    var instance;
    return function( html ) {
        if( !instance ) {
            instance = new CreateDiv( html );
        }

        return instance;
    }
})();

var a = new ProxySingletonCreateDiv( 'sven1' );
var b = new ProxySingletonCreateDiv( 'sven2' );

alert( a === b );
```

## JavaScript中的单例模式
```javaScript
/**
 * JavaScript中的单例模式
 */

// 单例模式的核心是只有一个实例变量，确保全局访问。
// JavaScript 的全局变量，通常作为单例来使用，这不是传统意义上的单例
var a = {};

// 但是这样做，会污染全局，导致全局变量过多难以维护
// 以下两种方法来改善这个问题
// 1.使用命名空间
var MyApp = {};

MyApp.namespace = function( name ) {
    var parts = name.split('.');
    var current = MyApp;
    for( var i in parts ){
        if ( !current[ parts[ i ] ] ) {
            current[ parts[ i ] ] = {};
        }
        current = current[ parts[ i ] ];
    }
};

MyApp.namespace( 'event' );
MyApp.namespace( 'dom.style' );

console.dir( MyApp );

// 2.使用闭包封装私有变量
var user = (function(){
    var __name = 'sven',
        __age = 29;

    return {
        getUserInfo: function(){
            return __name + '-' + __age;
        }
    }
})();
```

## 惰性单例（需要时候才去创建）
```javaScript
// 简单实现方法一 (有问题，进入WebQQ有时候不需要登录，但是现在这个方法登录浮窗是预先创造好的。)
// var loginLayer = (function(){
//     var div = document.createElement( 'div' );
//     div.innerHTML = '我是登录浮窗';
//     div.style.display = 'none';
//     document.body.appendChild( div );
//     return div;
// })();

// document.getElementById( 'loginBtn' ).onclick = function() {
//     loginLayer.style.display = 'block';
// };

// 简单实现方法二 （是惰性的，但是不是单例的）
// var createLoginLayer = function() {
//     var div = document.createElement( 'div' );
//     div.innerHTML = '我是登录浮窗';
//     div.style.display = 'none';
//     document.body.appendChild( div );
//     return div;
// };

// document.getElementById( 'loginBtn' ).onclick = function() {
//     var loginLayer = createLoginLayer();
//     loginLayer.style.display = 'block';
// };

// 简单实现方法三
var createLoginLayer = (function(){
    var div;
    return function() {
        if (!div) {
            div = document.createElement( 'div' );
            div.innerHTML = '我是登录浮窗';
            div.style.display = 'none';
            document.body.appendChild( div );
        }

        return div;
    }
})();

document.getElementById( 'loginBtn' ).onclick = function() {
    var loginLayer = createLoginLayer();
    loginLayer.style.display = 'block';
};
```

## 通用的惰性单例
```javaScript
var getSingle = function( fn ) {
    var result;
    return function() {
        return result || (result = fn.apply(this, arguments));
    }
}

var createLoginLayer = function(){
    var div = document.createElement( 'div' );
    div.innerHTML = '我是登录浮窗';
    div.style.display = 'none';
    document.body.appendChild( div );
    return div;
}

var createSingleLoginLayer = getSingle( createLoginLayer );

document.getElementById( 'loginBtn' ).onclick = function() {
    var loginLayer = createSingleLoginLayer();
    loginLayer.style.display = 'block';
}
```