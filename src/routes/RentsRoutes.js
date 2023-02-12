import { Router } from "express";
import { listRentals, postRental } from "../controller/rentalsController.js";
import { validateSchema } from "../middleware/validationSchema.js";
import { rentalsSchema } from "../schema/rentalsSchema.js";

const rentsRouter = Router();

rentsRouter.get("/rentals", listRentals)
rentsRouter.post("/rentals",validateSchema(rentalsSchema), postRental)
rentsRouter.put("/rentals:id/return")
rentsRouter.delete("/rentals")

export default rentsRouter