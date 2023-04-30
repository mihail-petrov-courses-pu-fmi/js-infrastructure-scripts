// CommonJS
const fs    = require('fs');

// Ecma Script Module
// import chalk from 'chalk';
const chalk = require('chalk');

const fake  = require('../_util/fake.js');
const cli   = require('../_util/cli.js');
cli.parse();

// Аргументи по подразбиране
const cliArgumentTimes  = cli.get('times') || 1;
const cliArgumentAction = cli.get('action');

if(!cliArgumentAction) {

    console.log(chalk.red("Please specify cli action"));
    console.log(chalk.red("--action=create"));
    console.log(chalk.red("--action=delete"));
    console.log(chalk.red("--action=recreate"));
    process.exit();
}

const ORIGIN_FOLDER     = "E:\\@dev\\@courses\\netit\\netit-webdev-js\\_meetings";
const FAKE_FOLDER_ID    = "$semester";


// ще генерирам папка за семестри с по няколко папки в нея
// спазващи логиката 
// w01-1 / w01-2
const createFakeDirectory = () => {

    const folderId  = fake.directoryId(FAKE_FOLDER_ID); 
    const newPath   = `${ORIGIN_FOLDER}\\${folderId}`;
    fs.mkdirSync(newPath);
};

const createInnerFakeDirectory = (path, directoryCount) => {

    const maxDirectoryCount = directoryCount + 2;

    for(let i = 2; i < maxDirectoryCount; i++) {

        const weekId   = parseInt(i / 2);
        const dayId    = (i % 2 == 0) ? 1 : 2;
        const fakeId   = `w0${weekId}-${dayId}`;
        const fakePath = `${path}\\${fakeId}`;

        fs.mkdirSync(fakePath);
    }

};

const processCreate = () => {

    for(let i = 0; i < cliArgumentTimes; i++) {

        // 1. Създай ми фалшива папка - която да пази други вътрешни
        const folderId  = fake.directoryId(FAKE_FOLDER_ID); 
        const newPath   = `${ORIGIN_FOLDER}\\${folderId}`;
        fs.mkdirSync(newPath);
        
        // 2. Създай много фалшиви папки - в текущата
        createInnerFakeDirectory(newPath, 6);
    }
};

const processDelete = () => {

    const folderCollection = fs.readdirSync(ORIGIN_FOLDER);

    for(let i = 0; i < folderCollection.length; i++) {
        const folderId = folderCollection[i];

        if(folderId.includes(FAKE_FOLDER_ID)) {

            const removePath = `${ORIGIN_FOLDER}\\${folderId}`;
            fs.rmSync(removePath, {
                recursive   : true,
                force       : true
            });
        }
    }
};

if(cliArgumentAction == "create")  {

    processCreate();
    console.log(chalk.green("Fake folders created successfuly"));    
}

if(cliArgumentAction == "delete") {

    processDelete();
    console.log(chalk.green("Fake folders removed successfuly"));
}

if(cliArgumentAction == "recreate") {

    processDelete();
    processCreate();
    console.log(chalk.green("Fake folders re-created successfuly"));
}