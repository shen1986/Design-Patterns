// 小明直接送花给A
var Flower = function(){};

var xiaoming = {
    sendFlower: function( target ){
        var flower = new Flower();
        target.receiveFlower( flower );
    }
};

var A = {
    receiveFlower: function( flower ){
        console.log( '收到花' + flower );
    }
}

xiaoming.sendFlower( A );