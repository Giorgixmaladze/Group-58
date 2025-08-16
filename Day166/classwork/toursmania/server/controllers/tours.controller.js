const { readFile } = require("../utils/dataMethods");

const getTours = (req, res) => {
  try {
    const tours = readFile("./data/tours.json"); // should return a string
    console.log(tours);
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(tours);
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "Error reading tours" }));
  }
};

module.exports = { getTours };
