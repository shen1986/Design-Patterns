import temp from './Images/bf1847b80c8aaa32b2ec70419ffdbc01.jpg';

var MyImage = (function(){
    var imgNode = document.createElement( 'img' );
    document.body.appendChild( imgNode );
    var img = new Image();

    img.onload = function(){
        // imgNode.src = img.src;
    };

    return {
        setSrc: function( src ){
            imgNode.src = temp;
            img.src = src;
        }
    }
})();

MyImage.setSrc( 'http://imgcache.qq.com/qzone/v6/portal/gy/upload/upfile_1034445_1495513359.jpg' );