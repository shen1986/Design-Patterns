# 策略模式
- 很多时候有多种途径到达同一个目的地。这个时候可以使用策略模式
    + 比如我们要去某个地方旅游
        * 如果没有时间但是不在乎钱，可以选择坐飞机。
        * 如果没有钱，可以选择坐大巴或者火车。
        * 如果再穷一点，可以选择骑自行车。
- 定义： 定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。

## 使用策略模式计算奖金
1. 最初的代码实现
```javaScript
// 根据等级分发不同的奖金
var calculateBonus = function( performanceLevel, salary) {
    if ( performanceLevel === 'S' ) {
        return salary * 4;
    }

    if ( performanceLevel === 'A' ) {
        return salary * 3;
    }

    if ( performanceLevel === 'B' ) {
        return salary * 2;
    };
}

console.log( calculateBonus( 'B', 20000 ) );
console.log( calculateBonus( 'S', 6000 ) );
```

可以发现这段代码有明显的缺点
- 函数比较庞大，包含了很多if-slse语句，这些语句需要覆盖所有的逻辑分支。
- 函数缺乏弹性，如果增加了一种新的绩效等级C，或者想把绩效S的奖金系数改为5，那我们必须深入函数的内部实现，这是违反开放封闭原则的。
- 算法的复用性差，如果在程序的其他地方需要重用这些计算奖金的算法呢？我们的选择只有复制粘贴。

2. 使用组合函数重构代码
```javaScript
var performanceS = function ( salary ) {
    return salary * 4;
};

var performanceA = function ( salary ) {
    return salary * 3;
};

var performanceB = function ( salary ) {
    return salary * 2;
};

// 根据等级分发不同的奖金
var calculateBonus = function( performanceLevel, salary) {
    if ( performanceLevel === 'S' ) {
        return performanceS( salary );
    }

    if ( performanceLevel === 'A' ) {
        return performanceA( salary );
    }

    if ( performanceLevel === 'B' ) {
        return performanceB( salary );
    };
}

console.log( calculateBonus( 'B', 20000 ) );
console.log( calculateBonus( 'S', 6000 ) );
```

这段代码改善了问题（绩效的算法能修改）但是还有一个根本问题没有解决，calculateBonus可能越来越庞大，系统变化是缺乏弹性。

3. 使用策略模式重构代码
```javaScript
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
```

## JavaScript版本的策略模式
- 之前的写法都是传统面向对象的实现。在JavaScript中，函数也是对象。所以做法可以更简单一些。
```javaScript
var strategies = {
    "S": function( salary ) {
        return salary * 4;
    },
    "A": function( salary ) {
        return salary * 3;
    },
    "B": function( salary ) {
        return salary * 2;
    }
};

var calculateBonus = function( level, salary ) {
    return strategies[ level ]( salary );
}

console.log( calculateBonus( 'S', 20000 ) );
console.log( calculateBonus( 'A', 10000 ) );
```

## 多态在策略模式中的体现
- 由上面的例子我们可以看到，我们避免了if else 的分支语句。Context并没有计算奖金的能力。而是把它委托给了某个策略对象。每个策略对象负责自己的算法。当我们发出“计算奖金”的请求时，它们会各自返回不同的结果，这就是多态的体现。

## 使用策略模式实现缓动动画
- JavaScript在Web开发中的两大用途，我想的结果是这样：
    + 动画
    + 验证表单
- 所以动画在Web中非常重要。

### 实现动画效果的原理
- 在JavaScript中，可以通过连续改变CSS属性来实现动画效果。

### 思路和一些准备工作
- 目标：编写一个动画类和一些缓动算法，让小球以各种各样的缓动效果在页面中运动。
- 必要信息的分析：
    + 动画开始时，小球所在的位置；
    + 小球移动的目标位置；
    + 动画开始时的准确时间点；
    + 小球运动持续的时间。

### 让小球动起来
- 首先先要做出各种缓动算法