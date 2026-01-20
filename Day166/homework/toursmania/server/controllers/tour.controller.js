const url = require("url");

const { readFile } = require("../utils/dataMethods.js");
const { writeFile } = require("../utils/dataMethods.js");
const getTours = (req, res) => {
    res.writeHead(200, { "content-type": "application/json" });
    return res.end(readFile('./data/tours.json'))
}

const getTour = (req, res) => {
    const urlParts = url.parse(req.url, true);
    const tourId = parseInt(urlParts.query.id);
    const tours = JSON.parse(readFile('./data/tours.json'));
    const tour = tours.find(t => t.id === tourId);

    if (!tour) {
        res.writeHead(404, { "content-type": "application/json" });
        return res.end(JSON.stringify({ message: "Tour not found" }));
    }

    res.writeHead(200, { "content-type": "application/json" });
    return res.end(JSON.stringify(tour))
}

const postTour = (req, res) => {
    
    let body = ""
    req.on("data",chunk =>{
        body += chunk.toString()
    })
    req.on("end", () => {
    const tours = JSON.parse(readFile("./data/tours.json"));
    const newTour = JSON.parse(body);

    tours.push(newTour);
    writeFile("./data/tours.json", JSON.stringify(tours));

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newTour));
  });
};

const updateTour = (req, res) => {
    const urlParts = url.parse(req.url, true);
    const tourId = parseInt(urlParts.query.id);
    const tours = JSON.parse(readFile("./data/tours.json"));

    const tourIndex = tours.findIndex(t => t.id === tourId);
    if (tourIndex === -1) {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "Tour not found" }));
    }

    let body = "";
    req.on("data", chunk => {
        body += chunk.toString();
    });

    req.on("end", () => {
        const updates = JSON.parse(body);
        tours[tourIndex] = { ...tours[tourIndex], ...updates };
        writeFile("./data/tours.json", JSON.stringify(tours));
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(tours[tourIndex]));
    });
};
const deleteTour = (req, res) => {
    const urlParts = url.parse(req.url, true);
    const urlId = parseInt(urlParts.query.id);
    const tours = JSON.parse(readFile("./data/tours.json"));

    const updatedTours = tours.filter(tour => tour.id !== urlId);

    writeFile("./data/tours.json", JSON.stringify(updatedTours));

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(updatedTours));    
}




module.exports = {
    getTours,
    getTour,
    updateTour,
    deleteTour,
    postTour
}