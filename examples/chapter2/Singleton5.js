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