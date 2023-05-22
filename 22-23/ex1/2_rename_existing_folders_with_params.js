// Целта на този скрипт е да намира папки 
// съдържащи 0 след водещият префих e и да 
// да я премахват 

// 1. Прочитаме съдържанието на папката ex1
// 2. Преглеждаме файл по файл и откриваме неточност
// 3. Редактираме името на файла с неточността

const fs = require("fs");
const argumentCollection = process.argv.slice(2);

const parameterMap = {};

for(let i = 0; i < argumentCollection.length; i++) {

    const argument          = argumentCollection[i];
    const argumentKeyValue  = argument.split("=");
    const argumentKey       = argumentKeyValue[0].replace('--', '');
    const argumentValue     = argumentKeyValue[1];
    parameterMap[argumentKey]= argumentValue;
}

// Константи
const DIR_SRC = `./upload/ex1/`;



// Синхорнна версия 
let folderCollection = fs.readdirSync(DIR_SRC);
console.log(folderCollection);

const isReplasable = (str) => {
    return str.includes(parameterMap["replace_with"]);
}

for(let i = 0; i < folderCollection.length; i++) {

    if(isReplasable(folderCollection[i])) {

        const fileId        = folderCollection[i];
        const newFolderId   = fileId.replace(parameterMap["replace_with"], "e");
        const oldPath       = `./upload/ex1/${fileId}`;
        const newPath       = `./upload/ex1/${newFolderId}`;

        fs.renameSync(oldPath, newPath);
    }
}