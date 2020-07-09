import { Router } from "express";
import {
  allWorkers,
  hireWorker,
  hireResponse,
  jobConfirmation,
} from "../controllers/worker.controller";

const routes = Router();

routes.get("/", allWorkers);
routes.post("/hire", hireWorker);
routes.post("/response", hireResponse);
routes.post("/confirm", jobConfirmation);

export default routes;
