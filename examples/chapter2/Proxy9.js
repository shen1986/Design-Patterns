var minConsole = (function(){
    var cache = [];
    var handler = function( ev ){
        if ( ev.keyCode  =  113 ) {
            var script = document.createElement( 'script' );
            script.onload = function(){
                for (let i = 0; i < cache.length; i++) {
                  const fn = cache[i];
                  fn();
                }
            };
            script.src = 'minConsole.js';
            document.getElementsByTagName( 'head' )[0].appendChild( script );
            document.body.removeEventListener( 'keydown', handler ); // 只加载一次minConsole.js
        }
    };

    document.body.addEventListener( 'keydown', handler, false );

    return {
        log: function(){
            var args = arguments;
            cache.push(function(){
                return minConsole.log.apply( miniConsole, args );
            });
        }
    }
})();

minConsole.log(11);  // 开始打印log

// minConsole.js 代码
minConsole = {
    log: function(){
        // 真正代码略
        console.log( Array.prototype.join.call( arguments ) );
    }
}
