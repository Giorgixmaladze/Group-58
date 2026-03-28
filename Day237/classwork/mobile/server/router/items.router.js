const express = require("express");
const { getItems, createItem } = require("../controllers/items.controller");

const router = express.Router();

router.get("/items", getItems);
router.post("/items", createItem);

module.exports = router;