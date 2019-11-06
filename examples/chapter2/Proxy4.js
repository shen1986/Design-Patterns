var myImage = (function(){
    var imgNode = document.createElement( 'img' );
    document.body.appendChild( imgNode );

    return {
        setSrc: function( src ){
            imgNode.src = src;
        }
    }
})();

myImage.setSrc( 'http://imgcache.qq.com/qzone/v6/portal/gy/upload/upfile_1034445_1495513359.jpg' );
