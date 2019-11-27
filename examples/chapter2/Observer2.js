var  salesOffices = {}; // 定义售楼处

salesOffices.clientList = [];  // 缓存列表，存放订阅者的回调函数

salesOffices.listen = function ( key, fn ) { // 增加订阅者
    if ( !this.clientList[ key ] ) {  // 如果还是没有订阅过此类消息，给该类消息创建一个缓存列表
        this.clientList[ key ] = [];
    }
    this.clientList[ key ].push( fn );         // 订阅的消息添加进缓存列表
};

salesOffices.trigger = function(){ // 发布消息
    var key = Array.prototype.shift.call( arguments ); // 取出消息类型
    var fns = this.clientList[ key ]; // 取出该消息对应的回调函数

    if ( !fns || fns.length === 0 ) { // 如果没有订阅该消息，则返回
        return false;
    }

    for (let i = 0; i < fns.length; i++) {
        const fn = fns[i];       // (2) // arguments 是发布消息时带上的参数
        fn.apply( this, arguments );
    }
}

salesOffices.listen( 'squareMeter88', function( price, squareMeter ){ // 小明订阅消息
    console.log( '价格= ' + price);
});

salesOffices.listen( 'squareMeter110', function( price, squareMeter ){ // 小红订阅消息
    console.log( '价格= ' + price );
});

salesOffices.trigger( 'squareMeter88', 200000);  // 发布88平方米房子的价格
salesOffices.trigger( 'squareMeter110', 300000); // 发布110平方米房子的价格