const fs = require('fs');


const filePath = './names.txt';


process.stdin.setEncoding('utf8');


process.stdin.on('data', (input) => {
    const name = input.trim(); 

    if (name) {
        fs.appendFile(filePath, name + '\n', (err) => {
            if (err) {
                console.error( err);
            }
        });
    } 
});