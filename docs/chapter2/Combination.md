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