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
