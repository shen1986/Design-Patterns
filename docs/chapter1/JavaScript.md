# 面向对象的JavaScript

1. 动态类型语言和鸭子类型
- 有一点基础的朋友都知道，JavaScript是一个动态类型的语言（具体差异就不讲了），这种语言相对于Java这种静态类型的语言有一定的自由性，上手简单，然而相应的也带来一些困扰。由于运行时才能确定类型，所以很多在静态语言中编译阶段就能检查出的bug，在动态语言中可能在实际运行的时候才能被发现出来。
- 但是也有好处，那就不用像Java那样编写太多的超类。就能实现多态的效果。

- 鸭子类型的故事
- 从前在JavaScript王国里，有一个国王，他觉得世界上最美妙的声音就是鸭子的叫声，于是国王召集大臣，要组建一个1000只鸭子组成的合唱团。大臣们找遍了全国，终于找到999只鸭子，但是始终还差一只，最后达成发现有一只非常特别的鸡，它的叫声跟鸭子一模一样，于是这只鸡就成为了合唱团的最后一员。
```javaScript
var duck = {
    duckSinging: function(){
        console.log('嘎嘎嘎')
    }
}
var chicken = {
    duckSinging: function(){
        console.log('嘎嘎嘎')
    }
}

var choir = []; // 合唱团

var joinChoir = function(animal) {
    if (animal && typeof animal.duckSinging === 'function') {
        choir.push(animal);
        console.log('恭喜加入合唱团')
        console.log('合唱团已有成员数量:' + choir.length)
    }
}

joinChoir(duck) // 恭喜加入合唱团
joinChoir(chicken) // 恭喜加入合唱团
```

- 可以看到我们不关心，它是鸭子还是鸡，只要他有鸭叫的方法，我们就认为它能够加入合唱团。所以这与传统的静态语言的设计模式有很大的差别。

2. 多态
- 举例说明，自己理解下
- 主人家里养了两只动物，分别是一只鸭和一只鸡，当主人向它们发出“叫”的命令时，鸭会“嘎嘎嘎”地叫，而鸡会“咯咯咯”地叫，这两只动物都会以自己的方式来发出叫声。它们同样“都是动物，并且可以发出叫声”，但根据主人的指令，它们会各自发出不同的叫声。


    1. 一段“多态”的JavaScript代码
    ```javaScript
    var makeSound = function( animal ) {
        if (animal instanceof Duck) {
            console.log('嘎嘎嘎')
        } else if (animal instanceof Chicken) {
            console.log('咯咯咯');
        }
    }

    var Duck = function(){};
    var Chicken = function(){};

    makeSound( new Duck() ); // 嘎嘎嘎
    makeSound( new Chicken() ); // 咯咯咯
    ```

    - 上面是多态代码，但是不能让人满意，因为如果增加动物比如一只狗，就必须改代码。


    2. 对象的多态性
    - 我们把不变的部分抽离出来，可变的部分单独写成类。如果再加一只狗不会影响makeSound方法。
    ```javaScript
    var makeSound = function ( animal ) {
        animal.sound();
    };

    var Duck = function() {}

    Duck.prototype.sound = function() {
        console.log('嘎嘎嘎')
    }

    var Chicken = function() {}

    Chicken.prototype.sound = function() {
        console.log('咯咯咯')
    }

    makeSound( new Duck() );
    makeSound( new Chicken() );
    ```


    3. 类型检查和多态
    - 在静态语言中要实现多态，要么通过接口类，要么通过父类（即超类）。可以尝试用Java写下上面的例子，相信代码量要多点。
    - 静态语言虽然安全，但是编写的困难度也随之上升。

    4. JavaScript的多态
    - 从上面的例子可以看出，JavaScript的多态是与生俱来的。我们不关心它是什么类型。只要它有Sound方法就可以了。

    5. 多态在面向对象程序设计中的作用
    - 举例说明
    - 在电影的拍摄现场，当导演喊出“action”是，主角开始背台词，照明师负责打灯光，后面的群众演员假装中枪倒地，道具师往镜头里撒上雪花。在得到同一个消息时，每个对象都知道自己该做什么。如果不利用对象的多态性，而是用面向过程的方式来编写这一段代码，那么相当于在电影开始拍摄之后，导演每次都要走到每个人的面前，确认他们的职业分工（类型），然后告诉他们要做什么。如果映射到程序中，那么程序中将充斥着条件分支语句。

    6. 设计模式与多态
    - 多态对设计模式很重要。很多设计模式都是利用多态来完成的。

3. 封装


