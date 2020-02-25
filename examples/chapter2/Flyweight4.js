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