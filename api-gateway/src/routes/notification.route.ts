import { Router } from "express";
import {
  allNotifications,
  getNotificationData,
  ackNotification,
  registerDevice,
  unregisterDevice,
} from "../controllers/notification.controller";

const routes = Router();

routes.put("/:id", ackNotification);
routes.get("/", allNotifications);
routes.get("/:id", getNotificationData);
routes.post("/registerDevice", registerDevice);
routes.post("/unregisterDevice", unregisterDevice);

export default routes;
