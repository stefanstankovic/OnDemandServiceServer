import { Router } from "express";
import { getRanks, addRanks } from "../controllers/rank.controller";

const routes = Router();

routes.get("/:workerId", getRanks);
routes.post("/", addRanks);

export default routes;
