import express from "express";
import cors from "cors";
import reviews from "./api/reviews.route.js";

const app = express();

app.use(cors());
app.use(express.json()); /*faz o site aceitar JSON como entrada*/

app.use("/api/v1/reviews", reviews); /* /api/versão da api/nome da api */
app.use("*", (req, res) => 
res.status(404).json({error: "not found"}))

export default app;
