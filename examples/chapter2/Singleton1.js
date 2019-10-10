/**
 * 单例模式的2种简单实现
 */
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