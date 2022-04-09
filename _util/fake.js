exports.directoryId = (prefix) => {

    const mainTime      = new Date().getTime();
    const uniqeOffset   = Math.random();
    const timestamp     = `${mainTime}${uniqeOffset}`;
    return `${prefix}__${timestamp}`;
};
