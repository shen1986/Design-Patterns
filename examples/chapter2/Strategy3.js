var performanceS = function() {};

performanceS.prototype.calculate = function(salary) {
    return salary * 4;
}

var performanceA = function() {};

performanceA.prototype.calculate = function(salary) {
    return salary * 3;
}

var performanceB = function() {};
performanceB.prototype.calculate = function(salary) {
    return salary * 2;
}

// 接下来定义奖金类
var Bonus = function(){
    this.salary = null;   // 原始工资
    this.strategy = null; // 绩效等级对应的策略对象
};

Bonus.prototype.setSalary = function( salary ) {
    this.salary = salary;  // 设置员工的原始工资
}

Bonus.prototype.setStrategy = function( strategy ) {
    this.strategy = strategy; // 设置员工绩效等级对应的策略对象
}

Bonus.prototype.getBonus = function() { // 取得奖金数额
    if (!this.strategy) {
        throw new Error('未设置strategy属性');
    }
    return this.strategy.calculate( this.salary ); // 把计算奖金的操作委托给对应的策略对象
}

// 根据等级分发不同的奖金
var bonus = new Bonus();

bonus.setSalary( 10000 );
bonus.setStrategy( new performanceS() );
console.log( bonus.getBonus() );

bonus.setStrategy( new performanceA() );
console.log( bonus.getBonus() );