const fs = require("fs");

const readItems = () => {
    const items = fs.readFileSync("./data/items.json", "utf-8");
    return JSON.parse(items);
}

const writeItems = (items) => {
    fs.writeFileSync("./data/items.json", JSON.stringify(items));
}

const getItems = (req,res) =>{
    const items = readItems();
    res.json(items);
}

const createItem = (req,res) =>{
    const {name} = req.body;

    const newItem = {
        id:Date.now(),
        name
    }

    const items = readItems();
    items.push(newItem);
    writeItems(items);
    res.json(newItem);
}



module.exports = { getItems, createItem };
