import { Router } from "express";
import { allWorkers } from "../controllers/worker.controller";

const routes = Router();

routes.get("/", allWorkers);

export default routes;
