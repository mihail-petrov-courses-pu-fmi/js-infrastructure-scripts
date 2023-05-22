const childProcess = require('child_process');

// const timestamp = Date.now();

// childProcess.execSync("git init");
// const result = childProcess.execSync("git remote");

// if(result.toString() == "") {
//     childProcess.execSync("git remote add origin https://github.com/mihail-petrov/fmi_directory_script.git");
//     childProcess.execSync("git branch -M main");
// }

// childProcess.execSync("git add .");
// childProcess.execSync(`git commit -m ${timestamp}`);
// childProcess.execSync(`git push -u origin main`);


childProcess.execSync("git init", {
    cwd : './upload/ex2/ABCDEFG'
});