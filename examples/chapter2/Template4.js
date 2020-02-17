var Coffee = function(){};

Coffee.prototype = new Beverage();

Coffee.prototype.brew = function(){
    console.log( '用沸水冲泡咖啡' );
};

Coffee.prototype.pourInCup = function(){
    console.log( '把咖啡倒进杯子' );
};

Coffee.prototype.addCondiments = function(){
    console.log( '加糖和牛奶' );
};

var coffee = new Coffee();
coffee.init();
