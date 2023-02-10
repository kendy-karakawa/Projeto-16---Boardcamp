import { Router } from "express";
import { listRentals } from "../controller/rentalsController.js";


const rentsRouter = Router();

rentsRouter.get("/rentals", listRentals)
rentsRouter.post("/rentals")
rentsRouter.put("/rentals")
rentsRouter.delete("/rentals")

export default rentsRouter