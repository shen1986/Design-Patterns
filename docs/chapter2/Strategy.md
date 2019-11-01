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
- 首先先要做出各种缓动算法(封装算法)
```javaScript
var tween = {
    linear: function(t, b, c, d) {
        return c*t/d + b;
    },
    easeIn: function(t, b, c, d) {
        return c * ( t /= d ) * t + b;
    },
    strongEaseIn: function(t, b, c, d) {
        return c * ( t /= d ) * t * t * t * t + b;
    },
    strongEaseOut: function(t, b, c, d) {
        return c * ( ( t = t / d - 1 ) * t * t * t * t + 1 ) + b;
    },
    sineaseIn: function(t, b, c, d) {
        return c * ( t / d ) * t * t + b;
    },
    sineaseOut: function(t, b, c, d) {
        return c * ( ( t = t / d -1 ) * t * t + 1 ) + b;
    }
}
```
- 在页面中放置一个DIV
```html
<div style="position:absolute; background:blue" id="div">我是div</div>
```

- 接下来定义Animate类
```javaScript
var Animate = function( dom ) {
    this.dom = dom;             // 进行运动的dom节点
    this.startTime = 0;         // 动画开始时间
    this.startPos = 0;          // 动画开始时，dom节点的位置，即dom的初始位置
    this.endPos = 0;            // 动画结束是，dom节点的位置，即dom的目标位置
    this.propertyName = null;   // dom节点需要被改变的CSS属性名
    this.easing = null;         // 缓动算法
    this.duration = null;       // 动画持续时间
}

/**
 * 启动这个动画
 */
Animate.prototype.start = function( propertyName, endPos, duration, easing ) {
    this.startTime = +new Date; // 动画的启动时间
    this.startPos = this.dom.getBoundingClientRect()[ propertyName ]; // dom节点初始位置
    this.propertyName = propertyName; // dom节点需要被改变的CSS属性名
    this.endPos = endPos; // dom节点的目标位置
    this.duration = duration; // 动画的持续时间
    this.easing = tween[ easing ]; // 缓动算法

    var self = this;
    var timeId = setInterval(function(){ // 启动定时器，开始执行动画
        if (self.step() == false) {      // 如果动画已经结束，则清除定时器
            clearInterval(timeId);
        }
    }, 19 );
}

/**
 * 每一帧要做的事情
 */
Animate.prototype.step = function() {
    var t = +new Date;      // 取得当前时间
    // 如果当前时间大于动画开始时间加上动画持续时间之和，动画已经结束
    if (t >= this.startTime + this.duration) {
        this.update( this.endPos );     // 更新小球的CSS属性值
        return false;
    }
    var pos = this.easing( t - this.startTime, this.startPos,
        this.endPos - this.startPos, this.duration );
    // pos为小球当前位置
    this.update( pos );     // 更新小球的CSS属性值
}

/**
 * 跟新小球的CSS
 */
Animate.prototype.update = function( pos ) {
    this.dom.style[ this.propertyName ] = pos + 'px';
};
```

## 更广义的“算法”
- 策略模式不是只能封装算法，它还可以封装业务规则等等。

## 表单验证
- 用策略模式来做表单验证
- 需求：写一个注册页面，在点击注册按钮之前，有如下几条校验逻辑。
    + 用户名不能为空
    + 密码长度不能少于6位
    + 手机号码必须符合格式

### 表单校验的第一个版本
- html代码
```html
    <form action="http://xxx.com/register" id="registerForm" method="post">
        请输入用户名：<input type="text" name="userName" />
        请输入密码：<input type="text" name="password" />
        请输入手机号码：<input type="text" name="phoneNumber" />
        <button>提交</button>
    </form>
```

- javaScript代码
```javaScript
var registerForm = document.getElementById( 'registerForm' );

registerForm.onsubmit = function() {
    if ( registerForm.userName.value === '' ) {
        alert( '用户名不能为空' );
        return false;
    }

    if ( registerForm.password.value.length < 6 ) {
        alert( '密码长度不能少于6位' );
        return false;
    }

    if ( !/(^1[3|5|8][0-9]{9}$)/.test( registerForm.phoneNumber.value ) ) {
        alert( '手机号码格式不正确' );
        return false;
    }
}
```

- 缺点
    + onsubmit 函数比较庞大，包含了很多if - else 语句，这些语句覆盖所有的校验规则
    + onsubmit 函数缺乏弹性 增加或修改校验规则，都必须深入到onsubmit函数中去，违反开放封闭原则
    + 算法复用性差

### 用策略模式重构表单校验
- 封装策略对象
```javaScript
var strategies = {
    isNonEmpty: function( value, errorMsg ) { // 不为空
        if ( value === '' ) {
            return errorMsg;
        }
    },
    minLength: function( value, length, errorMsg ) { // 限制最小长度
        if ( value.length < length ) {
            return errorMsg;
        }
    },
    isMobile: function( value, errorMsg ) { // 手机号码格式
        if ( !/(^1[3|5|8][0-9]{9}$)/.test( value ) ) {
            return errorMsg;
        }
    }
}
```

- 获取画面数据，并进行校验
```javaScript
var validataFunc = function(){
    var validator = new Validator();

    /** 添加一些校验规则 **/
    validator.add( registerForm.userName, 'isNonEmpty', '用户名不能为空' );
    validator.add( registerForm.password, 'minLength:6', '密码长度不能少于6位');
    validator.add( registerForm.phoneNumber, 'isMobile', '手机号码格式不正确');

    var errorMsg = validator.start(); // 获得校验结果
    return errorMsg;
}

var registerForm = document.getElementById( 'registerForm' );
registerForm.onsubmit = function(){
    var errorMsg = validataFunc(); // 如果errorMsg有确切的返回值，说明未通过校验
    if (errorMsg) {
        alert( errorMsg );
        return false; // 阻止表单提交
    }
};
```
- 代码说明
    + registerForm.password是参与校验的input输入框
    + 'minLength:6'： minLength是校验规则的名字，冒号后面代码校验规则用到的参数
    + 第三个参数是返回的错误信息

- Validator（校验类）的实现
```javaScript
var Validator = function(){
    this.cache = []; // 保存校验规则
}

Validator.prototype.add = function( dom, rule, errorMsg ) {
    var ary = rule.split(':'); // 把strategy和参数分开
    console.log(ary);
    this.cache.push(function(){ // 把校验的步骤用空函数包装起来，并且放入cache
        var strategy = ary.shift(); // 用户挑选的strategy
        ary.unshift( dom.value ); // 把input的value添加进参数列表
        ary.push( errorMsg ); // 把errorMsg添加进参数列表
        return strategies[ strategy ].apply( dom, ary );
    });
};

Validator.prototype.start = function(){
    for (let i = 0; i < this.cache.length; i++) {
        const  validataFunc = this.cache[i];
        var msg = validataFunc(); // 开始校验，并取得校验后的返回信息
        if ( msg ) { // 如果有确切的返回值，说明校验没有通过
            return msg;
        }
    }
};
```

- 这样修改摸个校验规则的时候，只需要修改少量的代码
- 比如用户名改成不能少于10位
```javaScript
// 追加
validator.add( registerForm.userName, 'minLength:10', '用户名长度不能小于10')；
```

### 给某个文本输入框添加多种校验规则
