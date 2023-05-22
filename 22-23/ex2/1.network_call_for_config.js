const https = require('https');
const { callbackify } = require('util');

const get = (url, callback) => {

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

const json = (url, callback) => {
    get(url, (response) => {
        callback(JSON.parse(response))
    });
}


json(`https://mihail-petrov-courses-pu-fmi.github.io/index.json`, (response) => {
    console.log(response);
});