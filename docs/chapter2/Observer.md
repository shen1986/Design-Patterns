# 发布-订阅模式
- 别名观察者模式，它定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。在JavaScript开发中，我们一般是用事件模型来替代传统的发布订阅模式。

## 现实中的发布订阅模式
- 小明最近看上了一套房子，到了售楼处之后才被告知，该楼盘的房子早已售罄。好在售楼MM告诉小明，不久后还有一些楼盘推出，开发商正在办理相关手续，手续办好后便可以购买。但到底是什么时候，目前还没有人能够知道。
- 于是小明记下了售楼处的电话，以后每天都会打电话过去询问是不是已经到了购买时。除了小明，还有小红、小强、小龙也会每天向售楼处咨询这个问题。一个星期过后，售楼MM决定辞职，因为厌倦了每天回答1000个相同内容的电话。
- 当然现实中没有这么笨的销售公司，实际上故事是这样的：小明离开之前，把电话号码留在了售楼处。销售MM答应他，新楼盘一推出就马上发信息通知小明。小红、小强和小龙也是一样，他们的电话号码都被记在售楼处的花名册上，新楼盘推出的时候，售楼MM会翻开花名册，遍历上面的电话号码，依次发送一条短信来通知他们。

## 发布订阅模式的作用
- 从上面的例子可以看出发布订阅模式的优点
    + 购房者不用再天天给售楼处打电话咨询开售时间，在合适的时间点，售楼处作为发布者会通知这些消息订阅者。
    + 购房者和售楼处之间不再强耦合在一起，当有新的购房者出现时，他只需把手机号码留在售楼处，售楼处不关心购房者的任何情况，不管购房者是男是女还是一只猴子。而售楼处的任何变动也不会影响购买者，比如售楼MM离职，售楼处从一楼搬到二楼，这些改变都跟购房者无关，只要售楼处记得发短信这件事情。

- 第一点说明发布订阅模式可以广泛的应用于异步编程中。
- 第二点说明发布订阅模式可以取代对象之间硬编码的通知机制。

## DOM事件
- DOM节点上绑定时间就是用的发布订阅者模式。

## 自定义事件
- 如何实现发布订阅者模式
    + 首先要指定好谁充当发布者（不如售楼处）
    + 然后给发布者添加一个缓存列表，用于存放回调函数以便通知订阅者（售楼处的花名册）
    + 最后发布消息的时候，发布者会遍历这个缓存列表，依次触发里面存放的订阅者回调函数（遍历花名册，挨个发短信）

- 先实现一个简单的
```javaScript
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
```

- 但是上面的例子有一个问题，小明只想买88平米的房子，但是发布者把110平米的信息也推送给了小明，这是一种困扰。所以增加一个Key稍微改下代码。
```javaScript
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
```

## 发布-订阅模式的通用实现
- 如果小明换了一个售楼处，那么这段代码要再写一遍。
- 所以我们应该把通用的部分取出来，放在一个单独的对象中。

```javaScript
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
    console.log( '价格= ' + price );
});

salesOffices.trigger( 'squareMeter88', 200000 );
salesOffices.trigger( 'squareMeter100', 300000 );
```

## 取消订阅的事件
- 有时候我们要提供取消订阅时间的方法，比如小明突然不想买房子，当然也不想在得到推送的短信了。
```javaScript
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
```
## 全局的发布-订阅对象
- 刚刚的例子存在2个问题
    + 我们给每个对象都添加了Listen和trigger方法，以及一个缓存列表clientList，这是一种资源浪费。
    + 小明和售楼处对象还是存在一定的耦合性，至少要知道对象名字，才能顺利订阅到事件。

- 有的时候我们可以定一个全局的订阅对象，程序所有的对象都可以订阅这个对象，减少了不必要的复杂度。

```javaScript
var Event = (function(){

    var clientList = {},
        listen,
        trigger,
        remove;
    
    listen = function( key, fn ){
        if ( !clientList[ key ] ) {
            clientList[ key ] = [];
        }
        clientList[ key ].push( fn );
    };

    trigger = function(){
        var key = Array.prototype.shift.call( arguments ),
            fns = clientList[ key ];
            if ( !fns || fns.length === 0 ) {
                return false;
            }
            for (let i = 0; i < fns.length; i++) {
                const fn = fns[i];
                fn.apply( this, arguments );
            }
    };

    remove = function( key, fn ){
        var fns = clientList[ key ];
        if ( !fns ) {
            return false;
        }

        if ( !fn ) {
            fns && ( fns.length = 0 );
        } else {
            for (let l = fns.length - 1; l >= 0; l--) {
                const _fn = fns[ l ];
                if ( _fn === fn ) {
                    fns.splice( l, 1 );
                }
            }
        }
    };

    return {
        listen: listen,
        trigger: trigger,
        remove: remove
    }

})();

Event.listen( 'squareMeter88', function( price ) { // 小红订阅消息
    console.log( `价格= ${price}`); // 输出： '价格= 2000000'
});

Event.trigger( 'squareMeter88', 2000000 );
```