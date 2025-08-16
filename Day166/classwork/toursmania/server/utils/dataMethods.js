const fs = require("fs");

const readFile = (filepath) =>{
    try {
        const data = fs.readFileSync(filepath, "utf-8");
        return data
    } catch (error) {
        console.error("Error reading file:", error);
        return null;
    }

    
}

module.exports = {readFile};