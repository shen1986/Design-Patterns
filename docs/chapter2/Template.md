# 模板方法模式

## 模板方法模式的定义和组成
- 模板方法模式由两部分组成，第一部分是抽象父类，第二部分是具体的实现子类。通常在抽象父类中封装了子类的算法框架，包括实现一些公共方法以及封装子类中所有方法的执行顺序。子类通过继承这个抽象类，也继承了整个算法结构，并且可以选择重写父类的方法。

## 第一个例子--Coffee or Tea
- 这是个经典的例子
    1. 先泡一杯茶
        1. 把水煮沸
        2. 用沸水冲泡咖啡
        3. 把咖啡倒进杯子
        4. 加糖和牛奶
    
    ```javaScript
    var Coffee = function(){};

    Coffee.prototype.boilWater = function(){
        console.log( '把水煮沸' );
    };

    Coffee.prototype.brewCoffeeGriends = function(){
        console.log( '用沸水冲泡咖啡' );
    };

    Coffee.prototype.pourInCup = function(){
        console.log( '把咖啡倒进杯子' );
    };

    Coffee.prototype.addSugarAndMilk = function(){
        console.log( '加糖和牛奶' );
    }

    Coffee.prototype.init = function(){
        this.boilWater();
        this.brewCoffeeGriends();
        this.pourInCup();
        this.addSugarAndMilk();
    }

    var coffee = new Coffee();
    coffee.init();
    ```

    2. 泡一壶茶
    - 泡茶的步骤
        1. 把水煮沸
        2. 用沸水浸泡茶叶
        3. 把茶水倒进杯子
        4. 加柠檬
    ```javaScript
    var Tea = function(){};

    Tea.prototype.boilWater = function(){
        console.log( '把水煮沸' );
    };

    Tea.prototype.steepTeaBag = function(){
        console.log( '用沸水浸泡茶叶' );
    };

    Tea.prototype.pourInCup = function(){
        console.log( '把茶水倒进杯子' );
    };

    Tea.prototype.addLemon = function(){
        console.log( '加柠檬' );
    }

    Tea.prototype.init = function(){
        this.boilWater();
        this.steepTeaBag();
        this.pourInCup();
        this.addLemon();
    }

    var tea = new Tea();
    tea.init();
    ```

    3. 分离出共同点
    - 冲泡过程
        
    泡咖啡 | 泡茶
    -|-
    把水煮沸 | 把水煮沸
    用沸水冲泡咖啡 | 用沸水浸泡茶叶
    把咖啡倒进杯子 | 用茶水倒进杯子
    加糖和牛奶 | 加柠檬

    - 我们找到主要以下几点不同
        + 原料不同。 一个是咖啡一个是茶，但我们可以把它们都抽象为“饮料”。
        + 泡的方式不同。咖啡是冲泡，而茶叶是浸泡，我们可以把它们抽象为“泡”。
        + 加入的调料不同。一个是糖和牛奶，一个是柠檬，但我们可以把它们都抽象为“调料”。
    
    - 抽象后整理为以下4步
    1. 把水煮沸
    2. 用沸水冲泡咖啡
    3. 把饮料倒进杯子
    4. 加调料

    ```javaScript
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
    ```

    4. 创建Coffee子类和Tea子类
    - Coffee 子类
    ```javaScript
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
    ```

    - Tea子类
    ```javaScript
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
    ```

    - 上面的`Beverage.prototype.init`就是模板方法，这个方法中封装了算法框架

## 抽象类