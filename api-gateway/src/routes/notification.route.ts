import { Router } from "express";
import {
  allNotifications,
  getNotificationData,
} from "../controllers/notification.controller";

const routes = Router();

routes.get("/", allNotifications);
routes.get("/:id", getNotificationData);

export default routes;
