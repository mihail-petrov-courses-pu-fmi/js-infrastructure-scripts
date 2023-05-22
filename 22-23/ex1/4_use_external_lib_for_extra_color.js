// Целта на този скрипт е да намира папки 
// съдържащи 0 след водещият префих e и да 
// да я премахват 

// 1. Прочитаме съдържанието на папката ex1
// 2. Преглеждаме файл по файл и откриваме неточност
// 3. Редактираме името на файла с неточността

const fs      = require("fs");
const cli     = require("./cli");
const chalk   = require("chalk");
const log     = require("./log");

const $replaceWithParam = cli.getParam("replace_with");

// Константи
const DIR_SRC = `./upload/ex1/`;


// Синхорнна версия 
log.init(`#1. Read all of the dirs`);
let folderCollection = fs.readdirSync(DIR_SRC);

log.end(`#1 SUCCESS.`);
console.log(folderCollection);

const isReplasable = (str) => {
    return str.includes($replaceWithParam);
}

for(let i = 0; i < folderCollection.length; i++) {

    if(isReplasable(folderCollection[i])) {

        const fileId        = folderCollection[i];
        const newFolderId   = fileId.replace($replaceWithParam, "e");
        const oldPath       = `./upload/ex1/${fileId}`;
        const newPath       = `./upload/ex1/${newFolderId}`;

        fs.renameSync(oldPath, newPath);
    }
}