import { Router } from "express";
import {
  allWorkersForEmployer,
  addLocation,
  workerDetails,
} from "../controllers/location.controller";

const routes = Router();

routes.get("/", allWorkersForEmployer);
routes.get("/:workerId", workerDetails);
routes.post("/", addLocation);

export default routes;
