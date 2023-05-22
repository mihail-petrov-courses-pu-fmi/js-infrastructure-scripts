const https = require('https');

exports.isFile = (fileName) => {

    const filePartCollection = fileName.split('.');
    return filePartCollection.length > 1; 
};

exports.isDir = (fileName) => {
    return !exports.isFile(fileName);
};


exports.getFileExtention = (fileName) => {

    const filePartCollection = fileName.split('.');
    return filePartCollection[filePartCollection.length - 1];
};


exports.get = (url, callback) => {

    https.get(url, (res) => {
        
        // let responseMessage = "";
        const responseMessageBuffer = [];

        res.on('data', (chunk) => {
            // responseMessage += chunk;
            responseMessageBuffer.push(chunk);
        });

        res.on('end', () => {
            callback(responseMessageBuffer.join(''));
        })
    });
}

exports.json = (url, callback) => {
    exports.get(url, (response) => {
        callback(JSON.parse(response))
    });
}