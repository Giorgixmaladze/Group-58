import { getTours } from "../controllers/tours.controller.js";

const router = (req, res) => {
  const { method, url } = req;

  if (method === "GET" && url === "/tours") {
    return getTours(req, res); 
  }
};

export { router };