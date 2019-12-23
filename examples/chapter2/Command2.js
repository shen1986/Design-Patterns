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