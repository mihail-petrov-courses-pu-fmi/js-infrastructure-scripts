// Трябва ми функционалност за работа с файлове и папки
// NODEJS - модули:
// - работа с файлове
// - работа с мрежови заявки
// - работа с протоколи от приложно ниво http / http2
// - работа със специфични процеси на операционната система

// Взимаме / регистрираме употребата на модула за работа с файлове
const fs                = require('fs');
const ORIGIN_DIR_PATH   = "E:\\@dev\\@courses\\netit\\netit-webdev-js\\_meetings\\@semester_1";
const CHAR_LIMIT        = 5;

const fileCollection = fs.readdirSync(ORIGIN_DIR_PATH);
console.log(fileCollection);

for(let i = 0; i < fileCollection.length; i++) {

    const fileId      = fileCollection[i];
    let isRenamable   = fileId.length > CHAR_LIMIT;

    if(isRenamable) {

        const newFileId     = fileId.replace('w0', 'w');
        const CURRENT_PATH  = `${ORIGIN_DIR_PATH}\\${fileId}`;
        const NEW_PATH      = `${ORIGIN_DIR_PATH}\\${newFileId}`;

        fs.renameSync(CURRENT_PATH, NEW_PATH);
    }
}