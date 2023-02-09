import express from "express";
import cors from "cors";
import rentsRouter from "./routes/RentsRoutes.js";
import gameRouter from "./routes/GameRoutes.js";


const app = express();
app.use(cors());
app.use(express.json());

app.use([rentsRouter, gameRouter])


const port = 5000;
app.listen(port, () => console.log("Server is running !!"));