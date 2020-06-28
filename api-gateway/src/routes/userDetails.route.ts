import { Router } from "express";
import {
  getDetails,
  updateDetails,
} from "../controllers/userDetails.controller";

const routes = Router();

routes.get("/:userId", getDetails);
routes.put("/:id", updateDetails);

export default routes;
