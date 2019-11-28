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

// 安装发布-订阅功能
var installEvent = function( obj ) {
    for( var i in event ) {
        obj[ i ] = event[ i ];
    }
};

// 测试代码
var salesOffices = {};
installEvent( salesOffices );

salesOffices.listen( 'squareMeter88', function( price ){ // 小明订阅消息
    console.log( '价格= ' + price );
});

salesOffices.listen( 'squareMeter100', function( price ){ // 小红订阅消息
    console.log( '价格= ' + price);
});

salesOffices.trigger( 'squareMeter88', 200000 );
salesOffices.trigger( 'squareMeter100', 300000 );