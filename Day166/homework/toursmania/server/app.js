// built in modules
const http = require("http");

// Routers
const router = require("./routers/tours.router.js");

const server = http.createServer((req, res) => {
     res.setHeader("Access-Control-Allow-Origin", "http://localhost:5174"); 
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }
    return router(req, res);
});

server.listen(8000, () => {
    console.log("Server is running on port 6000");
});