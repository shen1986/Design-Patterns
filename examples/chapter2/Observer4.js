var event = {
    clientList: {},
    listen: function ( key, fn ) {
        if ( !this.clientList[ key ] ) {
            this.clientList[ key ] = [];
        }
        this.clientList[ key ].push( fn ); // 订阅的消息添加进缓存列表
    },
    trigger: function() {
        var key = Array.prototype.shift.call( arguments ); // (1);
        var fns = this.clientList[ key ];

        if ( !fns || fns.length === 0 ) { // 如果没有绑定对应的消息
            return false;
        }

        for (let i = 0; i < fns.length; i++) {
            const fn = fns[i];
            fn.apply( this, arguments ); // (2) // arguments是Trigger时带上的参数
        }
    }
}

event.remove = function( key, fn ){
    var fns = this.clientList[ key ];

    if ( !fns ) { // 如果key对应的消息没有被人订阅，则直接返回
        return false;
    }
    if (!fn){ // 如果没有传入具体的回调函数，表示需要取消key对应消息的所有订阅
        fns && (fns.length = 0);
    } else {
        for (let l = fns.length - 1; l >= 0; l--) {
            const _fn = fns[l];
            if ( _fn === fn ) {
                fns.splice( l, 1 ); // 删除订阅者的回调函数
            }
        }
    }
};

// 安装发布-订阅功能
var installEvent = function( obj ) {
    for( var i in event ) {
        obj[ i ] = event[ i ];
    }
};

// 测试代码
var salesOffices = {};
var fn1,fn2;
installEvent( salesOffices );

salesOffices.listen( 'squareMeter88', fn1 = function( price ){ // 小明订阅消息
    console.log( '价格= ' + price );
});

salesOffices.listen( 'squareMeter100', fn2 = function( price ){ // 小红订阅消息
    console.log( '价格= ' + price);
});

salesOffices.remove( 'squareMeter88', fn1 ); // 删除小明的订阅
salesOffices.trigger( 'squareMeter88', 200000 );
salesOffices.trigger( 'squareMeter100', 300000 );