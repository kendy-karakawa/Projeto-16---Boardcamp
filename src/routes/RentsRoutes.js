import { Router } from "express";
import { listRentals, postRental } from "../controller/rentalsController.js";


const rentsRouter = Router();

rentsRouter.get("/rentals", listRentals)
rentsRouter.post("/rentals", postRental)
rentsRouter.put("/rentals")
rentsRouter.delete("/rentals")

export default rentsRouter