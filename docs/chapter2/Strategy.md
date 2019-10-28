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
- 算法的服用性差，如果在程序的其他地方需要重用这些计算奖金的算法呢？我们的选择只有赋值黏贴。

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