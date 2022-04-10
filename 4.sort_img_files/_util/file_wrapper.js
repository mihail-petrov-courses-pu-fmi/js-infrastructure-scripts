const FileWrapper = function(fileName, originPath) {

    const fileIdCollection  = fileName.split('.');
    const extentionPosition = (fileIdCollection.length - 1);
    this.extention          = (fileIdCollection[extentionPosition]).toLowerCase();
    this.name               = fileIdCollection[0];
    this.fullName           = fileName;
    this.originPath         = originPath;
};

FileWrapper.prototype.getOriginPath = function() {
    return `${this.originPath}\\${this.fullName}`;
};

exports.File = (fileName, originPath) => {
    return new FileWrapper(fileName, originPath);
}