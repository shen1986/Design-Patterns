import temp from './Images/bf1847b80c8aaa32b2ec70419ffdbc01.jpg';

var myImage = (function(){
    var imgNode = document.createElement( 'img' );
    document.body.appendChild( imgNode );

    return {
        setSrc: function( src ){
            imgNode.src = src;
        }
    }
})();

var proxyImage = (function(){
    var img = new Image();
    img.onload = function(){
        // myImage.setSrc( this.src );
    }
    return {
        setSrc: function( src ){
            myImage.setSrc(temp);
            img.src = src;
        }
    }
})();

proxyImage.setSrc( 'http://imgcache.qq.com/qzone/v6/portal/gy/upload/upfile_1034445_1495513359.jpg' );

