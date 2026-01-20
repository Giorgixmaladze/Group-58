const fs = require('fs');

const readFile = (filePath) => {
    const data = fs.readFileSync(filePath, 'utf-8');
    return data;
}

const writeFile = (filePath, data) => {
    return fs.writeFileSync(filePath, data, 'utf-8');
}
    module.exports = {
    readFile,
    writeFile
}