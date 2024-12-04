const fs = require('fs');
const path = require('path');

function countFiles(dir) {
  let fileCount = 0;

  function walk(directory) {
    const files = fs.readdirSync(directory);
    files.forEach(file => {
      const fullPath = path.join(directory, file);
      if (fs.statSync(fullPath).isDirectory()) {
        if (!['node_modules', 'dist', 'build'].includes(file)) {
          walk(fullPath);
        }
      } else {
        fileCount++;
      }
    });
  }

  walk(dir);
  return fileCount;
}

const projectDir = path.resolve(__dirname);
const totalFiles = countFiles(projectDir);
console.log(`Total number of files: ${totalFiles}`);