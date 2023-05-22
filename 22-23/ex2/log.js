const chalk = require("chalk")
const fs = require("fs");

exports.init = (message) => {

    const startDate = Date.now();
    console.log(chalk.blue(`[${startDate}] ${message}`));
}

exports.end = (message) => {
    
    const startDate = Date.now();
    console.log(chalk.green(`[${startDate}] ${message}`));
}


exports.log = (message) => {

    const startDate = Date.now();
    const line      = `[${startDate}] ${message} \n `;

    fs.writeFileSync("./log.txt", line, {
        flag: 'a'
    });
}