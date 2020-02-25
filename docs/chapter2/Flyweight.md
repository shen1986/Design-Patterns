# 享元模式
- 享元模式可以优化性能

## 初始享元模式
- 内衣工厂，有50中男士内衣和20种女士内衣，为了推销产品，请50个男模特和50个女模特，让他们分别穿上一件内衣来拍照。
```javaScript
var Model = function( sex, underwear ){
    this.sex = sex;
    this.underwear = underwear;
};

Model.prototype.takePhoto = function(){
    console.log( 'sex= ' + this.sex + ' underwear=' + this.underwear);
};

for (let i = 1; i <= 50; i++) {
    var maleModel = new Model( 'male', 'underwear' + i );
    maleModel.takePhoto();
};

for (let j = 1; j < 50; j++) {
    var femaleModel = new Model( 'female', 'underwear' + j );
    femaleModel.takePhoto();
};
```
- 上面这种写法会产生100个对象，如果衣服数量再多一些，很有可能造成内存泄漏
- 考虑如何优化这个场景，虽然有100件内衣，但很显然并不需要50个男模特和50个女模特。只要1男1女就足够了，为他们穿上不同的内衣来拍照。
```javaScript
var Model = function( sex ){
    this.sex = sex;
};

Model.prototype.takePhoto = function(){
    console.log( 'sex= ' + this.sex + ' underwear=' + this.underwear);
};

var maleModel = new Model( 'male' );
var femaleModel = new Model( 'female' );

for (let i = 1; i <= 50; i++) {
    maleModel.underwear = 'underwear' + i;
    maleModel.takePhoto();
};

for (let j = 1; j < 50; j++) {
    femaleModel.underwear = 'underwear' + j;
    femaleModel.takePhoto();
};
```
- 可以看到只需要2个状态就可以完成这个功能。

## 内部状态与外部状态
- 享元模式要求将属性划分为内部状态和外部状态
- 关于如何划分内部、外部状态，下面有几条经验提供了一些指引
    + 内部状态存储于对象内部。
    + 内部状态可以被一些对象共享。
    + 内部状态独立于具体场景，通常不会改变。
    + 外部状态取决于具体场景，并根据场景而变化，外部状态不能被共享。

## 享元模式的通用结构
- 模特的例子中还存在2个问题
    + 我们通过构造函数显示new出了男女两个model对象，在其他系统中，也许并不是一开始就需要所有的共享对象。
    + 给model对象手动设置了underwear外部状态，在更复杂的系统中，这不是一个最好的方式，因为外部状态可能会相当复杂，它们与共享对象的联系会变的困难。
- 我们可以通过工厂来解决第一个问题，对于第二个问题可以用一个管理器来记录对象相关的外部状态，使这些外部状态通过某个钩子和共享对象联系起来。

## 文件上传的例子

### 对象爆炸
- 上传文件支持同时多文件上传，如果选择2000个文件，为每个文件创建一个对象，那么内存将难以支撑程序。
```javaScript
var id = 0;

window.startUpload = function( uploadType, files ){ // uploadType 区分是控件还是flash
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        var uploadObj = new Upload( uploadType, file.fileName, file.fileSize );
        uploadObj.init( id++ );
    }
};

var Upload = function( uploadType, fileName, fileSize ){
    this.uploadType = uploadType;
    this.fileName = fileName;
    this.fileSize = fileSize;
    this.dom = null;
};

Upload.prototype.init = function( id ){
    var that = this;
    this.id = id;
    this.dom = document.createElement( 'div' );
    this.dom.innerHTML = 
            '<span>文件名称：' + this.fileName + '，文件大小：' + this.fileSize + '</span>' +
            '<button class="delFile">删除</button>';
    
    this.dom.querySelector( '.delFile' ).onclick = function(){
        that.delFile();
    }
    document.body.appendChild( this.dom );
};

Upload.prototype.delFile = function(){
    if ( this.fileSize < 3000 ) {
        return this.dom.parentNode.removeChild( this.dom );
    }

    if ( window.confirm( '确定要删除该文件吗？' + this.fileName ) ) {
        return this.dom.parentNode.removeChild( this.dom );
    }
}

startUpload( 'plugin', [
    {
        fileName: '1.txt',
        fileSize: 1000
    },
    {
        fileName: '2.html',
        fileSize: 3000
    },
    {
        fileName: '3.txt',
        fileSize: 5000
    }
]);

startUpload( 'flash', [
    {
        fileName: '4.txt',
        fileSize: 1000
    },
    {
        fileName: '5.html',
        fileSize: 3000
    },
    {
        fileName: '6.txt',
        fileSize: 5000
    }
]);
```

### 享元模式重构文件上传
- 先区分内部和外部状态

### 剥离外部状态
```javaScript
var Upload = function( uploadType ){
    this.uploadType = uploadType;
};

Upload.prototype.delFile = function( id ){
    uploadManager.setExternalState( id, this ); // (1)

    if ( this.fileSize < 3000 ) {
        return this.dom.parentNode.removeChild( this.dom );
    }

    if ( window.confirm( '确定要删除该文件吗？' + this.fileName )) {
        return this.dom.parentNode.removeChild( this.dom );
    }
}
```

### 工厂进行对象实例化
```javaScript
var UploadFactory = (function(){
    var createdFlyWeightObjs = {};

    return {
        create: function( uploadType ){
            if ( createdFlyWeightObjs [uploadType] ) {
                return createdFlyWeightObjs [uploadType];
            }

            return createdFlyWeightObjs [uploadType] = new Upload( uploadType );
        }
    }
})();
```