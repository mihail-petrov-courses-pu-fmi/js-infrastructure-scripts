const childProcess = require('child_process');
childProcess.execSync("git init");
childProcess.execSync("git add .");
childProcess.execSync(`git commit -m "two words message"`);
