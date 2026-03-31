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



const deleteItem = (req,res) =>{
    const {id} = req.params;

    const items = readItems();

    const updatedItems = items.filter(item => item.id !== Number(id));

    if (items.length === updatedItems.length) {
        return res.status(404).json({ message: "Item not found" });
    }
    writeItems(updatedItems);

    res.json({ message: `Item with ID ${id} was deleted successfully` });
}

const updateItem = (req,res) =>{
    const {id} = req.params;
 
    const {name} = req.body;

    const items = readItems();

    const itemIndex = items.findIndex(item => Number(id) === item.id);

    if(itemIndex){
        res.status(404).json({message:"Item not found"})
    }

    items[itemIndex].name = name;
    writeItems(items)
    res.json({message:"Item succesfully updated"});




}

module.exports = { getItems, createItem, deleteItem,updateItem };
