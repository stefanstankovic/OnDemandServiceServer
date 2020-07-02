import { RequestHandler } from "express";
import { ServiceRegistry } from "../services/service.registry";
import { PushNotifications } from "../grpc/_proto/notifications/notifications_pb";
import {
  NotificationType,
  Notification,
} from "../models/notification/notification.model";
import { isUndefined } from "lodash";

export const allNotifications: RequestHandler = async (req, res, next) => {
  // @ts-ignore
  const userId = req.user.id;

  const notificationsResponse: PushNotifications = await ServiceRegistry.getInstance().services.notificationsClient.getPushNotificationsForUser(
    userId
  );

  if (!notificationsResponse.getSuccess()) {
    res
      .status(400)
      .json({ success: false, message: notificationsResponse.getMessage() });
    return next();
  }

  const notificationsData = notificationsResponse.getNotificationsList();

  const userNotifications: Array<NotificationType> = notificationsData.map(
    (val) => {
      let tmpNotification = new Notification();
      tmpNotification.grpcNotificationData = val;
      return tmpNotification.notificationObject;
    }
  );

  res.status(201).json({ success: true, notifications: userNotifications });
};

export const updateNotifications: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  if (isUndefined(id)) {
    res.status(400).json({ success: false, message: "Id is undefined" });
    return next();
  }
  var response = await ServiceRegistry.getInstance().services.notificationsClient.updatePushNotification(
    id
  );

  if (!response.getSuccess()) {
    res.status(400).json({ success: false, message: response.getMessage() });
    return next();
  }

  res.status(201).json({ success: true });
};
