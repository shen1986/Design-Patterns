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
    2. 用沸水冲泡饮料
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
- 模板方法是一种严重依赖抽象类的设计模式，但是JavaScript没有抽象类

    1. 抽象类的作用
    - 向上转型
    - 提供一致的接口方法
    - 表示一种契约

    2. 抽象方法和具体方法
    - 抽象方法写在抽象类中，这些方法没有具体实现，当子类继承这个类时，必须实现这个方法
    - 抽象方法可以实现代码复用，而具体方法实现抽象方法的具体内容。

    3. 用Java实现Coffee or Tea 的例子
    - 在HeadFirst设计模式这本书里有

    4. JavaScript没有抽象类的缺点和解决方案
    - 缺点是我们不能保证子类一定重写了父类的抽象方法。
    - 解决这个缺点的2种方法。
        + 用鸭子类型来模拟接口检查。这回加上一些业务无关代码，还会带来一些不必要的复杂性
        + 让抽象方法直接抛出一个异常，那样当我们粗心漏写具体实现，至少在运行时能够得到一个错误
        ```javaScript
        Beverage.prototype.brew = function() {
            throw new Error( '子类必须重写brew方法' );
        };

        Beverage.prototype.pourInCup = function(){
            throw new Error( '子类必须重写pourInCup方法' );
        };

        Beverage.prototype.addCondiments = function(){
            throw new Error( '子类必须重写addCondiments方法' );
        }
        ```
## 模板方法的使用场景
- 比如Java中的HttpServlet技术
- 一个基于HttpServlet的程序包含7个生命周期分别对应一个都方法。
doGet
doHead
doPost
doPut
doDelete
doOption
doTrace

## 钩子方法
- 如果有一些个性的子类怎么办？比如我们在饮料类封装了饮料冲泡的顺序:
    1. 把水煮沸
    2. 用沸水冲泡饮料
    3. 把饮料倒进杯子
    4. 加调料
- 这个顺序适用于绝大多数人，但是有些人和咖啡的时候是不加调料的（糖和牛奶），既然父类Beverage规定好了这4个步骤，有什么办法能让子类不受这个约束呢？
- 钩子方法可以用来解决这个问题，用钩子是隔离变化的常用手段。我们在父类中容易变化的地方放置钩子，钩子可以有一个默认的实现，究竟要不要“挂钩”，这由子类自己决定
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

// 钩子方法
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

// 重写钩子方法
CoffeeWitWithHook.prototype.custmonerWantsCondiments = function(){
    return window.confirm( '请问需要咖啡吗？' );
};

var coffee = new CoffeeWitWithHook();
coffee.init();
```

## 好莱坞原则
- 不要来找我，我会给你打电话。

## 真的需要“继承”吗
```javaScript
var Beverage = function( param ){

    var boilWater = function(){
        console.log( '把水煮沸' );
    };

    var brew = param.brew || function(){
        throw new Error( '必须传递brew方法' );
    };

    var pourInCup = param.pourInCup || function(){
        throw new Error( '必须传递pourInCup方法' );
    };

    var addCondiments = param.addCondiments || function(){
        throw new Error( '必须传递addCondiments方法' );
    };

    var F = function(){};

    F.prototype.init = function(){
        boilWater();
        brew();
        pourInCup();
        addCondiments();
    };

    return F;
}

var Coffee = Beverage({
    brew: function(){
        console.log( '用沸水冲泡咖啡' );
    },
    pourInCup: function(){
        console.log( '把咖啡倒进杯子' );
    },
    addCondiments: function(){
        console.log( '加糖和牛奶' );
    }
});

var coffee = new Coffee();
coffee.init();
```