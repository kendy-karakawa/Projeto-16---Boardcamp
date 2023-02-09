import { Router } from "express";


const rentsRouter = Router();

rentsRouter.get("/rentals")
rentsRouter.post("/rentals")
rentsRouter.put("/rentals")
rentsRouter.delete("/rentals")

export default rentsRouter