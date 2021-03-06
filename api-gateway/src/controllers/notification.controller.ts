import { RequestHandler } from "express";
import { ServiceRegistry } from "../services/service.registry";
import {
  PushNotifications,
  NotificationData,
} from "../grpc/_proto/notifications/notifications_pb";
import {
  NotificationType,
  Notification,
} from "../models/notification/notification.model";
import { isUndefined, isNil } from "lodash";
import { HireRequestData } from "../models/notification/message_data/hireRequest.data";
import { Events } from "../hooks/event.types/event.types";
import { HireResponseData } from "../models/notification/message_data/hireResponse.data";
import { JobConfirmedData } from "../models/notification/message_data/jobConfirmed.data";
import { UserDevice } from "../models/notification/userDevice.model";

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
  return next();
};

export const ackNotification: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  if (isUndefined(id)) {
    res.status(400).json({ success: false, message: "Id is undefined" });
    return next();
  }

  const notificationResponse = await ServiceRegistry.getInstance().services.notificationsClient.getPushNotificationById(
    id
  );

  if (!notificationResponse.getSuccess()) {
    res
      .status(400)
      .json({ success: false, message: notificationResponse.getMessage() });
    return next();
  }

  const notificationData = notificationResponse.getData()!;
  notificationData.setDelivered(true);
  let response = await ServiceRegistry.getInstance().services.notificationsClient.updatePushNotification(
    notificationData
  );

  if (!response.getSuccess()) {
    res.status(400).json({ success: false, message: response.getMessage() });
    return next();
  }

  res.status(201).json({ success: true });
  return next();
};

export const getNotificationData: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  const notificationResponse = await ServiceRegistry.getInstance().services.notificationsClient.getPushNotificationById(
    id
  );

  if (!notificationResponse.getSuccess()) {
    res
      .status(400)
      .json({ success: false, message: notificationResponse.getMessage() });
    return next();
  }

  const notificationData = notificationResponse.getData();
  const notification = new Notification();
  notification.grpcNotificationData = notificationData!;

  const additionalInfo = await getNotificationAdditionalInfo(notificationData!);

  try {
    ServiceRegistry.getInstance().services.eventsBus.emit(
      Events.notificationOpened,
      id
    );
  } catch {}

  res.status(201).json({
    success: true,
    notification: notification.notificationObject,
    additionalInfo: additionalInfo,
  });
  return next();
};

export const registerDevice: RequestHandler = async (req, res, next) => {
  const { deviceId } = req.body;
  // @ts-ignore
  const userId = req.user.id;

  const userDevice = new UserDevice();
  userDevice.userDeviceObject = {
    id: null,
    userId: userId,
    deviceId: deviceId,
  };

  const response = await ServiceRegistry.getInstance().services.notificationsClient.addUserDevice(
    userDevice.grpcUserDeviceData
  );

  if (!response.getSuccess()) {
    res.status(400).json({ success: false, message: response.getMessage() });
    return next();
  }

  res.status(201).json({ success: true, id: response.getId() });
  return next();
};

export const unregisterDevice: RequestHandler = async (req, res, next) => {
  const { deviceId } = req.body;

  const response = await ServiceRegistry.getInstance().services.notificationsClient.removeUserDevice(
    deviceId
  );

  if (!response.getSuccess()) {
    res.status(400).json({ success: false, message: response.getMessage() });
    return next();
  }

  res.status(201).json({ success: true, id: response.getId() });
  return next();
};

async function getNotificationAdditionalInfo(
  notification: NotificationData
): Promise<Object | null> {
  const type = notification.getType();

  switch (type) {
    // #TODO : move constant in separate file
    case "hireRequest": {
      if (isNil(notification.getMessagedata())) {
        return null;
      }

      let data = JSON.parse(notification.getMessagedata()) as HireRequestData;
      let userResponse = await ServiceRegistry.getInstance().services.userClient.findUserById(
        data.userId
      );

      if (!userResponse.getSuccess()) {
        return null;
      }

      const userData = userResponse.getData();

      const userDetailsResponse = await ServiceRegistry.getInstance().services.userClient.findUserDetailsByUserId(
        data.userId
      );

      if (!userDetailsResponse.getSuccess()) {
        return null;
      }

      const userDetailsData = userDetailsResponse.getData();

      const hireRequestData = await ServiceRegistry.getInstance().services.workersClient.getHireRequestById(
        data.itemId
      );

      if (!hireRequestData.getSuccess()) {
        return null;
      }

      const hireRequest = hireRequestData.getRequestsList()[0];

      let messageData = data.message.split("|");

      return {
        user: {
          email: userData?.getEmail(),
          mobile: userData?.getMobile(),
          firstName: userDetailsData?.getFirstname(),
          lastName: userDetailsData?.getLastname(),
        },
        message: {
          when: messageData[0],
          where: messageData[1],
          comment: messageData[2],
        },
        itemId: data.itemId,
        itemStatus: hireRequest.getStatus(),
      };
    }
    case "hireAccepted":
    case "hireRejected": {
      if (isNil(notification.getMessagedata())) {
        return null;
      }

      let data = JSON.parse(notification.getMessagedata()) as HireResponseData;
      let userResponse = await ServiceRegistry.getInstance().services.userClient.findUserById(
        data.workerId
      );

      if (!userResponse.getSuccess()) {
        return null;
      }

      const userData = userResponse.getData();

      let userDetailsResponse = await ServiceRegistry.getInstance().services.userClient.findUserDetailsByUserId(
        data.workerId
      );

      if (!userDetailsResponse.getSuccess()) {
        return null;
      }

      const userDetailsData = userDetailsResponse.getData();

      const hireRequestData = await ServiceRegistry.getInstance().services.workersClient.getHireRequestById(
        data.itemId
      );

      if (!hireRequestData.getSuccess()) {
        return null;
      }

      const hireRequest = hireRequestData.getRequestsList()[0];

      return {
        user: {
          email: userData?.getEmail(),
          mobile: userData?.getMobile(),
          firstName: userDetailsData?.getFirstname(),
          lastName: userDetailsData?.getLastname(),
        },
        message: data.message,
        itemId: data.itemId,
        workerId: data.workerId,
        itemStatus: hireRequest.getStatus(),
      };
    }
    case "jobConfirmed": {
      if (isNil(notification.getMessagedata())) {
        return null;
      }

      let data = JSON.parse(notification.getMessagedata()) as JobConfirmedData;
      let userResponse = await ServiceRegistry.getInstance().services.userClient.findUserById(
        data.userId
      );

      if (!userResponse.getSuccess()) {
        return null;
      }

      const userData = userResponse.getData();

      let userDetailsResponse = await ServiceRegistry.getInstance().services.userClient.findUserDetailsByUserId(
        data.userId
      );

      if (!userDetailsResponse.getSuccess()) {
        return null;
      }

      const userDetailsData = userDetailsResponse.getData();

      return {
        user: {
          email: userData?.getEmail(),
          mobile: userData?.getMobile(),
          firstName: userDetailsData?.getFirstname(),
          lastName: userDetailsData?.getLastname(),
        },
        message: data.message,
        itemId: data.itemId,
        userId: data.userId,
        ranked: data.ranked,
      };
    }
    default:
      return null;
  }
}
