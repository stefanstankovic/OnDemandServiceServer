import { Router } from "express";
import {
  allNotifications,
  getNotificationData,
  ackNotification,
} from "../controllers/notification.controller";

const routes = Router();

routes.put("/:id", ackNotification);
routes.get("/", allNotifications);
routes.get("/:id", getNotificationData);

export default routes;
