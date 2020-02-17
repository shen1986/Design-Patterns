var Tea = function(){};

Tea.prototype = new Beverage();

Tea.prototype.brew = function(){
    console.log( '用沸水浸泡茶叶' );
};

Tea.prototype.pourInCup = function(){
    console.log( '把茶倒进杯子' );
};

Tea.prototype.addCondiments = function(){
    console.log( '加柠檬' );
};

var tea = new Tea();
tea.init();
