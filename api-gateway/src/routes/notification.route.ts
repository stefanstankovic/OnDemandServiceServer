import { Router } from "express";
import { allNotifications } from "../controllers/notification.controller";

const routes = Router();

routes.get("/", allNotifications);

export default routes;
