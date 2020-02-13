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