// външни библиотеки
const fs             = require('fs-extra');
const childProcess   = require('child_process');
const chalk          = require('chalk');
const _global        = require('./_global/global');
const _fileChecker   = require('./_util/file_checker.js');
const _fileProcessor = require('./_processor/file_processor');
const { File }       = require('./_util/file_wrapper.js');
const _mail          = require('./_util/mail');

// Създаваме на дестинационна папка
fs.mkdirSync(_global.DESTINATION_PATH);

const processDirectoryContent = (originPath) => {

    console.log(chalk.red(originPath))
    const fileCollection =  fs.readdirSync(originPath);

    for(const elementId of fileCollection) {
    
        if(_fileChecker.isProcessesableFile(elementId)) {
    
            const file = File(elementId, originPath);
            _fileProcessor.copyToPlaceholderFolder(file);
        }
    
        if(_fileChecker.isDirectory(elementId)) {
            
            const newPath = `${originPath}\\${elementId}`;
            processDirectoryContent(newPath);
        }
    }
};

// ** 
processDirectoryContent(_global.ORIGIN_PATH);

// ** 
const timestap = new Date().getTime();
const COMMAND_GIT_INIT      = `git init`;
const COMMAND_CHECK_REMOTE  = `git remote`;
const COMMAND_ADD_REMOTE    = `git remote add origin https://github.com/mihail-petrov/script_expreiment.git`;
const COMMAND_GIT_ADD       = `git add .`;
const COMMAND_GIT_COMMIT    = `git commit -m "commit - ${timestap}"`;
const COMMAND_GIT_PUSH      = `git push -u origin master`;
const commandProcess        = `${COMMAND_GIT_ADD} && ${COMMAND_GIT_COMMIT} && ${COMMAND_GIT_PUSH}`;


const configOption = {
    cwd: _global.ROOT_DESTINATION_PATH
};

try {

    const commandInitResult  = childProcess.execSync(COMMAND_GIT_INIT, configOption);
    const commandCheckRemote = childProcess.execSync(COMMAND_CHECK_REMOTE, configOption);

    // if(commandCheckRemote.length == 0) {
        childProcess.execSync(COMMAND_ADD_REMOTE, configOption);
    // }

    const result = childProcess.execSync(commandProcess, configOption);       
    _mail.send("Успешен ъплоуд", `commit - ${timestap}`);
}
catch(error) {
    console.log("Проблем");
    console.log(chalk.red(error));
    _mail.send("Нещо се обърка", `${error}`);
}

