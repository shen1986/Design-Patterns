var Beverage = function(){};

Beverage.prototype.boilWater = function(){
    console.log( '把水煮沸' );
};

// 空方法应该由子类继承
Beverage.prototype.brew = function(){};

// 空方法应该由子类继承
Beverage.prototype.pourInCup = function(){};

// 空方法应该由子类继承
Beverage.prototype.addCondiments= function(){};

Beverage.prototype.custmonerWantsCondiments = function(){
    return true;
};

Beverage.prototype.init = function(){
    this.boilWater();
    this.brew();
    this.pourInCup();
    if ( this.custmonerWantsCondiments() ){ // 如果挂钩返回true，则需要调料
        this.addCondiments();
    }
};

var CoffeeWitWithHook = function(){};

CoffeeWitWithHook.prototype = new Beverage();

CoffeeWitWithHook.prototype.brew = function(){
    console.log( '用沸水冲泡咖啡' );
};

CoffeeWitWithHook.prototype.pourInCup = function(){
    console.log( '把咖啡倒进杯子' );
};

CoffeeWitWithHook.prototype.addCondiments = function(){
    console.log( '加糖和牛奶' );
};

CoffeeWitWithHook.prototype.custmonerWantsCondiments = function(){
    return window.confirm( '请问需要咖啡吗？' );
};

var coffee = new CoffeeWitWithHook();
coffee.init();

