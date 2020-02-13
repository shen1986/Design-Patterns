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
- 通过上面的例子，我们可以不用去例会是否是叶子节点，这种透明性使得只要调用execute就能完成我们要的结果，但是谁又能保证没有对象有execute这个方法呢，又或是写错名字了，在别的语言例如Java可以通过抽象类，来约束所有的子类都实装这一个方法，但是JavaScript中写这个特别的类就比较“怪异”。
- JavaScript中的组合模式缺乏一定的严谨性，这是缺点，也是它的有点。

## 透明性带来的安全问题
- 组合对象可以拥有子节点，叶对象下面没有子节点，所以我们可能会发生一些误操作，比如视图往子节点中添加子节点。
- 解决方案通常是给叶对象也增加add方法，并且在调用这个方法的时候，抛出一个异常来及时提醒客户。
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

var openTvCommand = {
    execute: function(){
        console.log( '打开电视' );
    },
    add: function(){
        throw new Error( '叶对象不能添加子节点' );
    }
};

var macroCommand1 = MacroCommand();
macroCommand1.add( openTvCommand );
openTvCommand.add( macroCommand1 ); // Uncaught Error: 叶对象不能添加子节点
```

## 组合模式的例子--扫描文件夹
- 文件夹和文件的关系非常适合用组合模式来实现
- 有2层好处
    + 组合模式让Ctrl+V，Ctrl+C成为了一个统一的操作
    + 当我们杀毒扫描的时候不用关心里面有多少文件或文件夹，组合模式使得我们只要操作最外层的文件夹进行扫描

```JavaScript
/***** Folder *****/
var Folder = function( name ){
    this.name = name;
    this.files = [];
};

Folder.prototype.add = function( file ){
    this.files.push( file );
};

Folder.prototype.scan = function(){
    console.log( '开始扫描文件夹：' + this.name );
    for (let i = 0; i < this.files.length; i++) {
        const file = this.files[i];
        file.scan();
    }
};

/******* File *******/
var File = function( name ){;
    this.name = name;
};

File.prototype.add = function(){
    throw new Error( '文件下面不能再添加文件' );
};

File.prototype.scan = function(){
    console.log( '开始扫描文件：', this.name );
}

var folder = new Folder( '学习资料' );
var folder1 = new Folder( 'JavaScript' );
var folder2 = new Folder( 'jQuery' );

var file1 = new File( 'JavaScript设计模式与开发实践' );
var file2 = new File( '精通jQuery' );
var file3 = new File( '重构与模式' );

folder1.add( file1 );
folder2.add( file2 );

folder.add( folder1 );
folder.add( folder2 );
folder.add( file3 );

var folder3 = new Folder( 'Nodejs' );
var file4 = new File( '深入浅出Nodejs' );
folder3.add( file4 );

var file5 = new File( 'JavaScript语言精髓与编程实践' );

folder.add( folder1 );
folder.add( file5 )

folder.scan();
```

## 一些值得注意的地方
1. 组合模式不是父子关系
2. 对叶对象操作的一致性
3. 双向映射关系
4. 用职责链模式提高组合模式性能

## 引用父对象
- 组合对象保存了它下面的子节点的引用，这是组合模式的特点，此时树结构是从上至下的。但有时候我们需要在子节点上保持对父节点的引用，比如在组合模式中使用职责链是，有可能需要让请求从子节点往父节点上冒泡传递。还有当我们删除某个文件的时候，实际上是从这个文件所在的上层文件夹中删除该文件的。

```JavaScript
/***** Folder *****/
var Folder = function( name ){
    this.name = name;
    this.parent = null; // 增加this.parent属性
    this.files = [];
};

Folder.prototype.add = function( file ){
    file.parent = this; // 设置父对象
    this.files.push( file );
};

Folder.prototype.scan = function(){
    console.log( '开始扫描文件夹：' + this.name );
    for (let i = 0; i < this.files.length; i++) {
        const file = this.files[i];
        file.scan();
    }
};

Folder.prototype.remove = function(){
    if (!this.parent) {
        return;
    }
    for (let l = this.parent.files.length - 1; l >= 0; l--) {
        const file = this.parent.files[l];
        if ( file === this ) {
            this.parent.files.splice( l, 1 );
        }
    }
}

/******* File *******/
var File = function( name ){;
    this.name = name;
    this.parent = null;
};

File.prototype.add = function(){
    throw new Error( '文件下面不能再添加文件' );
};

File.prototype.scan = function(){
    console.log( '开始扫描文件：', this.name );
};

File.prototype.remove = function(){
    if ( !this.parent ) { // 根节点或者树外的游离点
        return;
    }
    for (let l = this.parent.files.length - 1; l >= 0; l--) {
        const file = this.parent.files[l];
        if ( file === this ) {
            this.parent.files.splice( l, 1 );
        }
    }
}

// 测试移除功能的代码
var folder = new Folder( '学习资料' );
var folder1 = new Folder( 'JavaScript' );
var file1 = new Folder( '深入浅出Nodejs' );
folder1.add( new File( 'JavaScript设计模式与开发实践' ));
folder.add( folder1 );
folder.add( file1 );

folder1.remove(); // 移除文件夹
folder.scan();
```

## 何时使用组合模式
- 2中情况
    + 表示对象的部分-整体层次结构。
    + 希望统一对待树中所有的对象。