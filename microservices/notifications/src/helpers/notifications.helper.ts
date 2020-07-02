import Notification, { INotification } from "../models/notification.model";
import {
  NotificationData,
  PushNotifications,
  Response,
  Query,
  UserId,
} from "../grpc/_proto/notifications/notifications_pb";
import { isString, set, isBoolean, isNil, isNull } from "lodash";

export class NotificationsHelper {
  constructor() {}

  public async SendPushNotification(
    notification: NotificationData
  ): Promise<Response> {
    const response = new Response();
    try {
      const newNotification: INotification = new Notification({
        userId: notification.getUserid(),
        type: notification.getType(),
        data: JSON.parse(notification.getMessagedata()),
        stringData: notification.getMessagedata(),
      });

      var savedNotification = await newNotification.save();
      response.setSuccess(true);
      response.setId(savedNotification._id);
    } catch (ex) {
      const err = ex as Error;
      response.setSuccess(false);
      response.setMessage(err.message);
    }

    return response;
  }

  public async GetPushNotificationForUser(
    userId: UserId
  ): Promise<PushNotifications> {
    const response = new PushNotifications();
    try {
      const query = Notification.find({ userId: userId.getId() });
      const notifications = (await query.exec()) as Array<INotification>;
      response.setNotificationsList(
        this.DbNotificationsToNotificationsData(notifications)
      );
    } catch (ex) {
      const err = ex as Error;
      response.setSuccess(false);
      response.setMessage(err.message);
    }

    return response;
  }

  public async FindPushNotificationsForUser(
    queryData: Query
  ): Promise<PushNotifications> {
    const response = new PushNotifications();
    try {
      let searchQuery = {};

      if (isString(queryData.getUserid())) {
        set(searchQuery, "userId", queryData.getUserid());
      }

      if (isBoolean(queryData.getDelivered())) {
        set(searchQuery, "delivered", queryData.getDelivered());
      }

      if (isString(queryData.getPartiallycontenten())) {
        set(searchQuery, "stringData", {
          $regex: ".*" + queryData.getPartiallycontenten() + ".*",
        });
      }

      const query = Notification.find(searchQuery);
      const notifications = (await query.exec()) as Array<INotification>;
      response.setNotificationsList(
        this.DbNotificationsToNotificationsData(notifications)
      );
    } catch (ex) {
      const err = ex as Error;
      response.setSuccess(false);
      response.setMessage(err.message);
    }
    return response;
  }

  public async GetUndeliveredNotificationsForUser(
    userId: UserId
  ): Promise<PushNotifications> {
    const response = new PushNotifications();
    try {
      const query = Notification.find({
        userId: userId.getId(),
        delivered: false,
      });
      const notifications = (await query.exec()) as Array<INotification>;
      response.setNotificationsList(
        this.DbNotificationsToNotificationsData(notifications)
      );
    } catch (ex) {
      const err = ex as Error;
      response.setSuccess(false);
      response.setMessage(err.message);
    }

    return response;
  }

  public async updatePushNotification(
    notificationData: NotificationData
  ): Promise<Response> {
    const response = new Response();
    try {
      if (isNil(notificationData.getId())) {
        throw new Error("Notification is missing!");
      }

      const notificationForUpdate: INotification | null = await Notification.findById(
        notificationData.getId()
      ).exec();

      if (isNull(notificationForUpdate)) {
        throw new Error(
          `There is no notification with id: ${notificationData.getId()}`
        );
      }

      const propertiesToUpdate = this.UpdateNotificationProperties(
        notificationForUpdate,
        notificationData
      );

      await Notification.updateOne(
        { _id: notificationData.getId() },
        propertiesToUpdate
      );

      response.setSuccess(true);
      response.setId(notificationForUpdate.id);
    } catch (ex) {
      const err = ex as Error;
      response.setSuccess(false);
      response.setMessage(err.message);
    }
    return response;
  }

  private UpdateNotificationProperties(
    notification: INotification,
    notificationData: NotificationData
  ): Object {
    let propertiesToUpdate = {};

    if (
      isBoolean(notificationData.getDelivered()) &&
      notification.delivered != notificationData.getDelivered()
    ) {
      set(propertiesToUpdate, "delivered", notificationData.getDelivered());
    } else {
      throw new Error("You can update only delivered property!");
    }

    return propertiesToUpdate;
  }

  private DbNotificationsToNotificationsData(
    notifications: INotification[]
  ): Array<NotificationData> {
    return notifications.map<NotificationData>((value: INotification) => {
      const notificationData = new NotificationData();
      notificationData.setId(value.id);
      notificationData.setUserid(value.userId);
      notificationData.setType(value.type);
      notificationData.setMessagedata(value.stringData);
      notificationData.setDelivered(value.delivered);

      return notificationData;
    });
  }
}
