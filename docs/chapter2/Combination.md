# 组合模式
- 地球和一些其他的行星围绕太阳转，或者在一个原子中，有许多电子围绕着原子核旋转。
可以设想，太阳系也许是一个更大世界里的一个原子，地球只是围绕着太阳原子的一个电子。
而我们身上的每个原子又是一个星系，原子核就是这个星系中的恒星，电子是围绕着恒星旋转的行星。
一个电子中也许还包含了另一个宇宙。
- 上面的东西有点异想天开，但在程序设计中，也有一些和“事务是由相似的子事务构成”类似的思想。
组合模式就是用小的子对象来构建更大的对象，而这些小的子对象本身也许是由更小的“孙对象”构成的。

## 回顾宏命令
- 宏命令中包含一组子命令，它们组成一个树形结构。
- 其中`MacroCommand`被称为组合对象，closeDoorCommand，openCommand，openQQCommand都是叶对象。
- 这就是一个简单的组合模式

```javaScript
var closeDoorCommand = {
    execute: function(){
        console.log( '关门' );
    }
};

var openPcCommand = {
    execute: function(){
        console.log( '开电脑' );
    }
};

var  openQQComand = {
    execute: function(){
        console.log( '登录QQ' );
    }
}

var  MacroCommand = function(){
    return {
        commandsList: [],
        add: function( command ) {
            this.commandsList.push( command );
        },
        execute: function(){
            for (var i = 0; i < this.commandsList.length; i++){
                const command = this.commandsList[i];
                command.execute();
            }
        }
    }
};

var macroCommand = MacroCommand();
macroCommand.add( closeDoorCommand );
macroCommand.add( openPcCommand );
macroCommand.add( openQQComand );

macroCommand.execute();
```

## 组合模式的用途
- 表示树形结构
    + 组合模式的优点：提供了一种遍历树形结构的方案，通过组合对象的`execute`方法，程序会递归调用组合对象下面的叶对象的execute方法，所以我们只需要一次操作，便能依次完成关门，打开电脑，登录QQ这几件事情。组合模式可以非常方便地描述对象部分-整体层次结构。
- 利用对象多态性统一对待组合对象和单个对象
    + 利用对象的多态性表现，可以使客户端忽略组合对象和单个对象的不同。在组合模式中，客户将统一地使用组合结构中的所有对象，而不需要关心它究竟是组合对象还是单个对象。

## 请求在树中传递的过程
- 如果子节点是叶对象，叶对象自身会处理这个请求，而如果子节点还是组合对象，请求会继续往下传递，叶对象下面不会再有其他的子节点，一个叶对象就是树的这条枝叶的尽头，组合对象下面可能还会有子节点。
- 请求从上到下沿着树进行传递，直到树的尽头。作为客户，只需要关心树最顶层的组合对象，客户只需要请求这个组合对象，请求便会沿着树往下出阿迪，依次到达所有的叶对象。

## 更强大的宏命令
- 做一个"超级遥控器",有以下功能
    + 打开空调
    + 打开电视和音响
    + 关门，开电脑，登录QQ

```html
<button id="button">按我</button>
```

```javaScript
var MacroCommand = function(){
    return {
        commandsList:[],
        add: function( command ){
            this.commandsList.push( command );
        },
        execute: function(){
            for (let i = 0; i < this.commandsList.length; i++) {
                const command = this.commandsList[i];
                command.execute();
            }
        }
    }
};

var openAcCommand = {
    execute: function(){
        console.log( '打开空调' );
    }
};

/******** 家里的电视和音响是连接在一起的,所以可以用一个宏命令来组合打开电视和打开音响的命令 ********/

var openTvCommand = {
    execute: function(){
        console.log( '打开电视' );
    }
};

var openSoundCommand = {
    execute: function(){
        console.log( '打开音响' );
    }
};

var macroCommand1 = MacroCommand();
macroCommand1.add( openTvCommand );
macroCommand1.add( openSoundCommand );

/********** 关门，打开电脑和打登录QQ的命令 *********/

var closeDoorCommand = {
    execute: function(){
        console.log( '关门' );
    }
};

var openPcCommand = {
    execute: function(){
        console.log( '开电脑' );
    }
};

var openQQCommand = {
    execute: function(){
        console.log( '登录QQ' );
    }
};

var macroCommand2 = MacroCommand()
macroCommand2.add( closeDoorCommand );
macroCommand2.add( openPcCommand );
macroCommand2.add( openQQCommand );

/**** 现在把命令组成一个超级命令 *****/
var macroCommand = MacroCommand();
macroCommand.add( openAcCommand );
macroCommand.add( macroCommand1 );
macroCommand.add( macroCommand2 );

/***** 最后给遥控器绑定“超级命令” *****/
var setCommand = (function( command ){
    document.getElementById( 'button' ).onclick = function(){
        command.execute();
    }
})( macroCommand );
```

## 抽象类在组合模式中的作用