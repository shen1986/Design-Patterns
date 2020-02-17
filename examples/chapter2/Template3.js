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

Beverage.prototype.init = function(){
    this.boilWater();
    this.brew();
    this.pourInCup();
    this.addCondiments();
};
