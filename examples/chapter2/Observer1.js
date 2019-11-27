var  salesOffices = {}; // 定义售楼处

salesOffices.clientList = [];  // 缓存列表，存放订阅者的回调函数

salesOffices.listen = function ( fn ) { // 增加订阅者
    this.clientList.push( fn );         // 订阅的消息添加进缓存列表
};

salesOffices.trigger = function(){ // 发布消息
    for (let i = 0; i < this.clientList.length; i++) {
        const fn = this.clientList[i];       // (2) // arguments 是发布消息时带上的参数
        fn.apply( this, arguments );
    }
}

salesOffices.listen( function( price, squareMeter ){ // 小明订阅消息
    console.log( '价格= ' + price);
    console.log( 'squareMeter= ' + squareMeter);
});

salesOffices.listen( function( price, squareMeter ){ // 小红订阅消息
    console.log( '价格= ' + price );
    console.log( 'squareMeter= ' + squareMeter );
});

salesOffices.trigger( 200000, 88);
salesOffices.trigger( 300000, 110);