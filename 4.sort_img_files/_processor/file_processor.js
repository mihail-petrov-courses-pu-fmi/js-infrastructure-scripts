const fs            = require('fs-extra');
const _fileChecker  = require('../_util/file_checker');
const _global       = require('../_global/global');

const getDestPath = function($file) {
    return `${_global.DESTINATION_PATH}\\${$file.extention}`;
};

const getCopyPath = function($file) {
    return `${_global.DESTINATION_PATH}\\${$file.extention}\\${$file.fullName}`;
};

exports.copyToPlaceholderFolder = ($file) => {

    const originPath   = $file.getOriginPath();
    const destPath     = getDestPath($file);
    const copyDestPath = getCopyPath($file);

    if(!_fileChecker.isDestDirAvailable($file.extention)) {
        fs.mkdirSync(destPath);
    }

    fs.copyFileSync(originPath, copyDestPath);
};