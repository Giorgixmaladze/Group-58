const express = require("express");
const { getItems, createItem, deleteItem,updateItem } = require("../controllers/items.controller");

const router = express.Router();

router.get("/items", getItems);
router.post("/items", createItem);
router.delete("/items/:id", deleteItem)
router.patch("/items/:id",updateItem)

module.exports = router;