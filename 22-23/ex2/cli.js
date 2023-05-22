const parameterMap = {};

const parseCli = () => {

    const argumentCollection = process.argv.slice(2);

    for(let i = 0; i < argumentCollection.length; i++) {
    
        const argument          = argumentCollection[i];
        const argumentKeyValue  = argument.split("=");
        const argumentKey       = argumentKeyValue[0].replace('--', '');
        const argumentValue     = argumentKeyValue[1];
        parameterMap[argumentKey]= argumentValue;
    }

    return parameterMap; 
}

exports.getParam = (key) => {

    const parameterMap = parseCli();
    return parameterMap[key];
}