const fs = require('fs-extra');

const ORIGIN_FOLDER_PATH    = "E:\\@dev\\@courses\\netit\\netit-webdev-js\\_meetings";
const NEW_FOLDER_PATH       = `${ORIGIN_FOLDER_PATH}\\@total`;
let nextId                  = 1;
let returnCount             = 0;

// Стъпка 1 - прочитам всички папки
const folderIdCollection = fs.readdirSync(ORIGIN_FOLDER_PATH);

// Стъпка 2 -  създавам нова папка за всички под-директории
fs.mkdirSync(NEW_FOLDER_PATH);

// Стъпка 3 - изчитам под папките и копирам на новото място
const returnNextId = () => {

    // # Тернарен оператор
    // # ==
    // returnCount = (returnCount == 2) ? 1 : returnCount++;
    // return (returnCount == 2) ? ++nextId : nextId++;

    // # Условна конструкция
    // # ==
    if(returnCount == 2) {
        returnCount = 1;
        return ++nextId;
    }

    returnCount++;
    return nextId++;
};

const transferInnerFolder = (parentFolderPath) => {

    const innerFolderCollection = fs.readdirSync(parentFolderPath);
    for(let i = 0; i < innerFolderCollection.length; i++) {
        const folderId                  = innerFolderCollection[i];
        const folderIdPartCollection    = folderId.split('-');
        const dayId                     = folderIdPartCollection[1];
        const weekId                    = returnNextId();
        const newFolderId               = `w${weekId}-${dayId}`;

        const SOURCE_PATH   = `${parentFolderPath}\\${folderId}`;
        const DEST_PATH     = `${NEW_FOLDER_PATH}\\${newFolderId}`;
        fs.copySync(SOURCE_PATH, DEST_PATH);
    }
}

for(let i = 0; i < folderIdCollection.length; i++) {

    const parentFolderId        = folderIdCollection[i];
    const PARENT_FOLDER_PATH    = `${ORIGIN_FOLDER_PATH}\\${parentFolderId}`;
    transferInnerFolder(PARENT_FOLDER_PATH);
}