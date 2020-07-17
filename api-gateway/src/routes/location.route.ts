import { Router } from "express";
import {
  allWorkersForEmployer,
  addLocation,
} from "../controllers/location.controller";

const routes = Router();

routes.get("/", allWorkersForEmployer);
routes.post("/", addLocation);

export default routes;
