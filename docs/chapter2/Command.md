# 命令模式
- 假设有一个快餐店，而我是该餐厅的点餐服务员，那么我一天的工作应该是这样的：当某位客人点餐或者打来订餐电话后，我会把他的需求都写在清单上，然后交给厨房，客人不用关心是哪些厨师帮他炒菜。我们餐厅还可以满足客人需要的定时服务，比如客人可能当前正在回家的路上，要求1个小时后才开始炒他的菜，只要订单还在，厨师就不会忘记。客人也可以很方便地打电话来撤销订单。另外如果有太多的客人点餐，厨房可以按照订单的顺序排队炒菜。
- 这些记录着订餐信息的清单，便是命令模式中的命令对象。

## 命令模式的用途
- 最常见的应用场景是：有时候需要向某些对象发送请求，但是并不知道请求接收者是谁，也不知道被请求的操作是什么。此时希望用一种松耦合的方式来设计程序，使得请求的发送者和接受者能够清楚彼此之间的耦合关系。
- 另外，相对于过程化的请求调用，command对象拥有更长的生命周期。对象的生命周期是跟初始化请求无关，因为这个请求已经被封装在了command对象的方法中，成为了这个对象的行为。我们可以在程序运行的任意时刻去调用这个方法。
- 除了这2点之外，命令模式还支持撤销，排队等操作。

## 命令模式的例子--菜单程序
- 假设编写一个用户界面程序，界面上有数十个Button按钮，决定让某个程序员负责绘制按钮，而另外一个程序员负责编写按钮后的具体行为，这些行为封装在对象中。

- 绘制：
```javaScript
    // html 画面
    <button id="button1">点击按钮1</button>
    <button id="button2">点击按钮2</button>
    <button id="button3">点击按钮3</button>

    // Script 处理
    var button1 = document.getElementById( 'button1' );
    var button2 = document.getElementById( 'button2' );
    var button3 = document.getElementById( 'button3' );

    // 负责绘制按钮的程序员不关心有什么命令，他只需要预留好安装命令的接口
    var setCommand = function( button, command ){
        button.onclick = function(){
            console.log("command绑定",command)
            command.execute();
        }
    };
```

- 负责编写具体行为
- 程序员只需要知道`setCommand`方法，和button1~3对象名字，就可以处理事件了。
```javaScript
var MenuBar = {
    refresh: function(){
        console.log( '刷新菜单目录' );
    }
}

var SubMenu = {
    add: function(){
        console.log( '增加子菜单' );
    },
    del: function(){
        console.log( '删除子菜单' );
    }
};

var RefreshMenuBarCommand = function( receiver ){
    this.receiver = receiver;
};

RefreshMenuBarCommand.prototype.execute = function(){
    this.receiver.refresh();
};

var AddSubMenuCommand = function( receiver ){
    this.receiver = receiver;
};

AddSubMenuCommand.prototype.execute = function(){
    this.receiver.add();
};

var DelSubMenuCommand = function( receiver ){
    this.receiver = receiver;
};

DelSubMenuCommand.prototype.execute = function(){
    this.receiver.del();
}

var refreshMenuBarCommand = new RefreshMenuBarCommand( MenuBar );
var addSubMenuCommand = new AddSubMenuCommand( SubMenu );
var delSubMenuCommand = new DelSubMenuCommand( SubMenu );

setCommand( button1, refreshMenuBarCommand );
setCommand( button2, addSubMenuCommand );
setCommand( button3, delSubMenuCommand );
```

## JavaScript中的命令模式
- JavaScript中一切都是函数，函数可以作为参数传递，所以不用像上面写的那么复杂
```javaScript
var button1 = document.getElementById( 'button1' );
var button2 = document.getElementById( 'button2' );
var button3 = document.getElementById( 'button3' );

// JavaScript一切皆是函数的优势
var bindClick = function( button, func ){
    button.onclick = func;
}

var MenuBar = {
    refresh: function(){
        console.log( '刷新菜单目录' );
    }
}

var SubMenu = {
    add: function(){
        console.log( '增加子菜单' );
    },
    del: function(){
        console.log( '删除子菜单' );
    }
};

bindClick( button1, MenuBar.refresh );
bindClick( button2, SubMenu.add );
bindClick( button3, SubMenu.del );
```

## 撤销命令
