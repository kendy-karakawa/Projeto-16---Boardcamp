import { Router } from "express";
import { listGames, postGame } from "../controller/gameController.js";
import { validateSchema } from "../middleware/validationSchema.js";
import { postGameSchema } from "../schema/gameSchema.js";


const gameRouter = Router();

gameRouter.get("/games", listGames);
gameRouter.post("/games",validateSchema(postGameSchema), postGame);

export default gameRouter;