const argumentsResult = {};

exports.parse = () => {

    const argumentCollection = process.argv.slice(2);

    for(let i = 0; i < argumentCollection.length; i++) {
        const argumentElementCollection = argumentCollection[i].split('=');
        // --times 
        // 5
        const argumentKey   = argumentElementCollection[0].replace('--', '');
        const argumentValue = argumentElementCollection[1];
        argumentsResult[argumentKey] = argumentValue;
    }
}

exports.getAll = () => {
    console.log(argumentsResult);
};

exports.get = (key) => {
    return argumentsResult[key];
};