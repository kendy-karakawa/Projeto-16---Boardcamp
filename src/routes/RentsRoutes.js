import { Router } from "express";
import { deleteRental, finishRental, listRentals, postRental } from "../controller/rentalsController.js";
import { validateSchema } from "../middleware/validationSchema.js";
import { rentalsSchema } from "../schema/rentalsSchema.js";

const rentsRouter = Router();

rentsRouter.get("/rentals", listRentals)
rentsRouter.post("/rentals",validateSchema(rentalsSchema), postRental)
rentsRouter.post("/rentals/:id/return", finishRental)
rentsRouter.delete("/rentals/:id", deleteRental)

export default rentsRouter