// 小明通过B送花给A
var Flower = function(){};

var xiaoming = {
    sendFlower: function( target ){
        var flower = new Flower();
        target.receiveFlower( flower );
    }
};

var B = {
    receiveFlower: function( flower ){
        A.listenGoodMood(function(){
            A.receiveFlower( flower );
        });
    }
}

var A = {
    receiveFlower: function( flower ){
        console.log( '收到花' + flower );
    },
    listenGoodMood: function( fn ){
        setTimeout(function(){ // 假设10秒之后A的心情变好
            fn();
        }, 10000);
    }
}

xiaoming.sendFlower( B );