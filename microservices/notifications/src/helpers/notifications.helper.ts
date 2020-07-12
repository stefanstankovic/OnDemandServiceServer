import Notification, { INotification } from "../models/notification.model";
import {
  NotificationData,
  PushNotifications,
  Response,
  Query,
  UserId,
  NotificationId,
  NotificationDataResponse,
} from "../grpc/_proto/notifications/notifications_pb";
import {
  isString,
  set,
  isBoolean,
  isNil,
  isNull,
  isEmpty,
  isUndefined,
} from "lodash";

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
      response.setSuccess(true);
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

      if (
        !isUndefined(queryData.getUserid) &&
        isString(queryData.getUserid()) &&
        !isEmpty(queryData.getUserid())
      ) {
        set(searchQuery, "userId", queryData.getUserid());
      }

      if (
        !isUndefined(queryData.getDelivered) &&
        isBoolean(queryData.getDelivered())
      ) {
        set(searchQuery, "delivered", queryData.getDelivered());
      }

      if (
        !isUndefined(queryData.getOpened) &&
        isBoolean(queryData.getOpened())
      ) {
        set(searchQuery, "opened", queryData.getOpened());
      }

      if (
        !isUndefined(queryData.getPartiallycontenten) &&
        isString(queryData.getPartiallycontenten()) &&
        !isEmpty(queryData.getPartiallycontenten())
      ) {
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

  public async UpdatePushNotification(
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

  public async GetPushNotificationById(
    notificationId: NotificationId
  ): Promise<NotificationDataResponse> {
    let response = new NotificationDataResponse();

    try {
      if (isNil(notificationId?.getId())) {
        throw new Error("Notification Id is missing");
      }

      let notification = await Notification.findById(
        notificationId.getId()
      ).exec();

      if (isNil(notification)) {
        throw new Error(
          `Notification with id ${notificationId.getId()} doesn't exist`
        );
      }

      response.setSuccess(true);
      response.setData(this.DbNotificationToNotificationData(notification));
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
      !isUndefined(notificationData.getDelivered()) &&
      isBoolean(notificationData.getDelivered()) &&
      notification.delivered != notificationData.getDelivered()
    ) {
      set(propertiesToUpdate, "delivered", notificationData.getDelivered());
    }

    if (
      !isUndefined(notificationData.getOpened()) &&
      isBoolean(notificationData.getOpened()) &&
      notification.opened != notificationData.getOpened()
    ) {
      set(propertiesToUpdate, "opened", notificationData.getOpened());
    }

    if (
      !isUndefined(notificationData.getMessagedata()) &&
      isString(notificationData.getMessagedata()) &&
      !isEmpty(notificationData.getMessagedata()) &&
      notification.stringData !== notificationData.getMessagedata()
    ) {
      set(propertiesToUpdate, "stringData", notificationData.getMessagedata());
    }

    return propertiesToUpdate;
  }

  private DbNotificationsToNotificationsData(
    notifications: INotification[]
  ): Array<NotificationData> {
    return notifications.map<NotificationData>((value: INotification) => {
      return this.DbNotificationToNotificationData(value);
    });
  }

  private DbNotificationToNotificationData(
    notification: INotification
  ): NotificationData {
    const notificationData = new NotificationData();
    notificationData.setId(notification.id);
    notificationData.setUserid(notification.userId);
    notificationData.setType(notification.type);
    notificationData.setMessagedata(notification.stringData);
    notificationData.setDelivered(notification.delivered);
    notificationData.setOpened(notification.opened);

    return notificationData;
  }
}
