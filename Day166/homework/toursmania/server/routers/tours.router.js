const { getTours, getTour, updateTour, deleteTour, postTour } = require("../controllers/tour.controller.js");

const router = (req, res) => {
    const { url, method } = req;

    if (url === "/tours" && method === "GET") {
        return getTours(req, res);
    } 
    else if (url === "/tours" && method === "POST") {  
        return postTour(req, res);
    } 
    else if (url.startsWith("/tour") && method === "GET") {
        return getTour(req, res);
    } 
    else if (url.startsWith("/tour") && method === "PATCH") {
        return updateTour(req, res);
    } 
    else if (url.startsWith("/tour") && method === "DELETE") {
        return deleteTour(req, res);
    } 
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
};

module.exports = router;