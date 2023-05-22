const fs            = require('fs');
const childProcess  = require('child_process');
const util          = require('./util');
const log           = require('./log'); 

let DIR_SRC   = `./upload/ex2/art`;
let DIR_DEST  = `./upload/ex2/`;

// прочитаме стартовата директория и откриваме:
// - дали работим с файл - в този случай правим обработка на същия
// - дали работим с директория - в този случай траверсираме
const traverseDirectory = (originPath) => {

    const fileCollection = fs.readdirSync(originPath);

    for(const fileName of fileCollection) {
    
        if(util.isDir(fileName)) {
            traverseDirectory(`${originPath}/${fileName}`);
        }

        if(util.isFile(fileName)) {

            const extention = util.getFileExtention(fileName);
            const srcPath   = `${originPath}/${fileName}`;
            const destDir   = `${DIR_DEST}/${extention}`;
            const destPath  = `${destDir}/${fileName}`;

            try {
                fs.mkdirSync(destDir);
                fs.copyFileSync(srcPath, destPath);
            }
            catch(error) {
                fs.copyFileSync(srcPath, destPath);
            }
        }
    }

    log.log('The operation move - finished');
};

/**
 * 
 * @param {string} initPath 
 * @param {string} branchName 
 */
const transferToGitHub = (initPath, branchName) => {

    const REMOTE_URL        = `https://github.com/mihail-petrov/fmi_directory_script.git`;
    const timestamp         = Date.now();
    const gitConfigOption   = { 
        cwd: initPath
    };

    childProcess.execSync("git init", gitConfigOption);
    const result = childProcess.execSync("git remote", gitConfigOption);

    if(result.toString() == "") {
        childProcess.execSync(`git remote add origin ${REMOTE_URL}`, gitConfigOption);        
    }

    childProcess.execSync(`git branch -M ${branchName}`);
    childProcess.execSync("git add .");
    childProcess.execSync(`git commit -m ${timestamp}`);
    childProcess.execSync(`git push -u origin ${branchName}`);
}

const removeProcessedDirectory = (path) => {

    fs.rmdirSync(path, {
        recursive: true
    });
}


util.json(`https://mihail-petrov-courses-pu-fmi.github.io/index.json`, (response) => {

    const destFolderId = response.template;
    DIR_DEST = `${DIR_DEST}/${destFolderId}`;

    // създаве си папка в която да сложим всички изображения, които сме сортирали
    try {
        fs.mkdirSync(DIR_DEST);
    }
    catch(error) {

    }

    traverseDirectory(DIR_SRC);
    transferToGitHub(DIR_DEST, destFolderId);
    removeProcessedDirectory(DIR_DEST);
});