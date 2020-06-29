import { Router } from "express";
import {
  allWorkers,
  hireWorker,
  hireResponse,
} from "../controllers/worker.controller";

const routes = Router();

routes.get("/", allWorkers);
routes.post("/hire", hireWorker);
routes.post("/response", hireResponse);

export default routes;
