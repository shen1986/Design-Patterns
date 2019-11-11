var synchronousFile = function( id ){
    console.log( '开始同步文件，id为：' + id);
};

var proxySynchronousFile = (function(){
    var cache = [], // 保存一段时间内需要同步的ID
        timer; // 定时器
    
    return function( id ){
        cache.push( id );
        if ( timer ) { // 保证不会覆盖已经启动的定时器
            return;
        }

        timer = setTimeout(function(){
            synchronousFile( cache.join( ',' ) ); // 2秒后向本体发送需要同步的ID集合
        }, 2000);
    }
})();

var checkbox = document.getElementsByTagName('input');

for (let i = 0; i < checkbox.length; i++) {
    const c = checkbox[i];
    c.onclick = function(){
        if (this.checked === true) {
            proxySynchronousFile( this.id );
        }
    }
}