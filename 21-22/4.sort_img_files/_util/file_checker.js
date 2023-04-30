const fs        = require('fs-extra');
const _global   = require('../_global/global.js');

const isFile = (fileName) => {
    return fileName.includes('.');
};

exports.isProcessesableFile = (fileName) => {

    if(!isFile(fileName)) {
        return false;
    }

    const fileIdCollection  = fileName.split('.');
    const extentionPosition = (fileIdCollection.length - 1);
    const extention         = (fileIdCollection[extentionPosition]).toLowerCase();

    return _global.PROCESSABLE_EXTENTION_COLLECTION.includes(extention);
};

exports.isDirectory = (directoryName) => {
    return !isFile(directoryName);
};

exports.isDestDirAvailable = (path) => {

    const destPath = `${_global.DESTINATION_PATH}\\${path}`;
    return fs.existsSync(destPath);
}