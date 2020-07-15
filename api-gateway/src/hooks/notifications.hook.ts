import { Services, ServiceRegistry } from "../services/service.registry";
import { EventEmitter } from "events";
import { Events } from "./event.types/event.types";
import { UserType } from "../models/user/user.model";
import { isUndefined, isNil } from "lodash";
import {
  PushNotifications,
  NotificationData,
} from "../grpc/_proto/notifications/notifications_pb";
import { HireRequestType } from "../models/workers/hireWorker.model";
import { HireResponseType } from "../models/workers/hireResponse.model";
import {
  NotificationType,
  Notification,
  PushNotificationType,
} from "../models/notification/notification.model";
import { JobConfirmedData } from "../models/notification/message_data/jobConfirmed.data";

import * as admin from "firebase-admin";
import { TokenMessage } from "firebase-admin/lib/messaging";

var serviceAccount = require("../../firebaseAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://schemepotrcko-1478115443042.firebaseio.com",
});

export class NotificationsHook {
  private _evensBus: EventEmitter;

  constructor(private _services: Services) {
    this._evensBus = this._services.eventsBus;

    this._evensBus.on(Events.userConnectedOnSocket, this.userConnected);
    this._evensBus.on(Events.workerHireRequest, this.hireRequest);
    this._evensBus.on(Events.workerAcceptedHireRequest, this.onHireResponse);
    this._evensBus.on(Events.notificationOpened, this.onGetNotification);
    this._evensBus.on(Events.newNotificationAdded, this.newNotificationAdded);
    this._evensBus.on(Events.jobConfirmed, this.onJobConfirmed);
    this._evensBus.on(Events.newRankSubmitted, this.onRankSubmitted);
    this._evensBus.on(Events.userLogout, this.onUserLogOut);
  }

  /**
   * On connect event handler
   * @param args array of arguments
   * @param args[0] connected user. Expected type UserType
   */
  private async userConnected(...args: any[]) {
    const user: UserType = args[0] as UserType;
  }

  private async onUserLogOut(...args: any[]) {
    const logoutData = args[0] as { userId: string; deviceId: string };

    const response = await ServiceRegistry.getInstance().services.notificationsClient.removeUserDevice(
      logoutData.deviceId
    );

    if (!response.getSuccess()) {
      console.log(
        `Adding the notification failed. Message: ${response.getMessage()}`
      );
    }
  }

  /**
   * @param args array of params
   * @param args[0] new Notification. Expected type NotificationType
   */
  private async newNotificationAdded(...args: any[]) {
    const notification = args[0] as NotificationType;

    const notificationModel = new Notification();
    notificationModel.notificationObject = notification;
    var pushNotification: PushNotificationType =
      notificationModel.pushNotificationObject;

    try {
      ServiceRegistry.getInstance().services.eventsBus.emit(
        Events.notifyUser,
        notification.userId,
        pushNotification
      );
    } catch (ex) {
      const err = ex as Error;
      console.log(err.message);
    }

    const userDevicesResponse = await ServiceRegistry.getInstance().services.notificationsClient.getUserDevices(
      notification.userId
    );

    if (!userDevicesResponse.getSuccess()) {
      console.log(
        `Adding the notification failed. Message: ${userDevicesResponse.getMessage()}`
      );
    }

    userDevicesResponse.getDevicesList().forEach((value) => {
      const messageToSend: TokenMessage = {
        token: value.getUserdevice(),
        notification: {
          title: pushNotification.title,
          body: pushNotification.subtitle,
        },
      };

      admin
        .messaging()
        .send(messageToSend)
        .then((response) => {
          // Response is a message ID string.
          console.log("Successfully sent message:", response);
        })
        .catch((error) => {
          console.log("Error sending message:", error);
        });
    });
  }

  /**
   * @param args array of params.
   * @param args[0] hire request object. Expected type HireRequestType
   */
  private async hireRequest(...args: any[]) {
    const hireRequest: HireRequestType = args[0] as HireRequestType;

    if (isNil(hireRequest)) {
      return;
    }

    const pushNotification: NotificationData = new NotificationData();
    let message = {
      userId: hireRequest.employerId,
      message: hireRequest.requestMessage,
      itemId: hireRequest.id,
    };
    pushNotification.setDelivered(false);
    pushNotification.setOpened(false);
    pushNotification.setMessagedata(JSON.stringify(message));

    // #TODO : move constant in separate file
    pushNotification.setType("hireRequest");
    pushNotification.setUserid(hireRequest.workerId);

    const response = await ServiceRegistry.getInstance().services.notificationsClient.sendPushNotification(
      pushNotification
    );

    if (!response.getSuccess()) {
      console.log(
        `Adding the notification failed. Message: ${response.getMessage()}`
      );
      return;
    }

    pushNotification.setId(response.getId());

    const newNotification = new Notification();
    newNotification.grpcNotificationData = pushNotification;

    ServiceRegistry.getInstance().services.eventsBus.emit(
      Events.newNotificationAdded,
      newNotification.notificationObject
    );
  }

  /**
   * On on hire request event handler
   * @param args array of params.
   * @param args[0] hire request object. Expected type HireRequestType
   * @param args[1] hire response object. Expected type HireResponseType
   */
  private async onHireResponse(...args: any[]) {
    const hireRequest = args[0] as HireRequestType;
    const hireResponse = args[1] as HireResponseType;

    const pushNotification: NotificationData = new NotificationData();
    let message = {
      workerId: hireRequest.workerId,
      message: hireResponse.responseMessage,
      itemId: hireRequest.id,
    };
    pushNotification.setDelivered(false);
    pushNotification.setOpened(false);
    pushNotification.setMessagedata(JSON.stringify(message));

    // #TODO : move constant in separate file
    pushNotification.setType(
      hireResponse.accepted ? "hireAccepted" : "hireRejected"
    );
    pushNotification.setUserid(hireRequest.employerId);

    const response = await ServiceRegistry.getInstance().services.notificationsClient.sendPushNotification(
      pushNotification
    );

    if (!response.getSuccess()) {
      console.log(
        `Adding the notification failed. Message: ${response.getMessage()}`
      );
      return;
    }

    pushNotification.setId(response.getId());

    const newNotification = new Notification();
    newNotification.grpcNotificationData = pushNotification;

    ServiceRegistry.getInstance().services.eventsBus.emit(
      Events.newNotificationAdded,
      newNotification.notificationObject
    );
  }

  /**
   * On get notification event handler
   * @param args array of params.
   * @param args[0] Notification ID
   */
  private async onGetNotification(...args: any[]) {
    let notificationId = args[0];

    const notificationData = new NotificationData();
    notificationData.setId(notificationId);
    notificationData.setDelivered(true);
    notificationData.setOpened(true);

    let response = await ServiceRegistry.getInstance().services.notificationsClient.updatePushNotification(
      notificationData
    );

    if (!response.getSuccess()) {
      console.log({
        action: Events.notificationOpened,
        success: false,
        message: response.getMessage(),
      });
      return;
    }
  }

  /**
   * On job confirm event handler
   * @param args array of params.
   * @param args[0] hire request object. Expected type HireRequestType
   * @param args[1] job confirmation object. Expected type JobConfirmationData
   */
  private async onJobConfirmed(...args: any[]) {
    const hireRequest: HireRequestType = args[0] as HireRequestType;

    const notifyWorker: NotificationData = new NotificationData();
    let workerMessage = {
      userId: hireRequest.employerId,
      message: hireRequest.requestMessage,
      itemId: hireRequest.id,
      ranked: false,
    };
    notifyWorker.setDelivered(false);
    notifyWorker.setOpened(false);
    notifyWorker.setMessagedata(JSON.stringify(workerMessage));

    // #TODO : move constant in separate file
    notifyWorker.setType("jobConfirmed");
    notifyWorker.setUserid(hireRequest.workerId);

    const workerNotificationResponse = await ServiceRegistry.getInstance().services.notificationsClient.sendPushNotification(
      notifyWorker
    );

    if (!workerNotificationResponse.getSuccess()) {
      console.log({
        action: Events.notificationOpened,
        success: false,
        message: workerNotificationResponse.getMessage(),
      });
      return;
    }

    notifyWorker.setId(workerNotificationResponse.getId());

    const newNotification = new Notification();
    newNotification.grpcNotificationData = notifyWorker;

    ServiceRegistry.getInstance().services.eventsBus.emit(
      Events.newNotificationAdded,
      newNotification.notificationObject
    );

    const notifyEmployer: NotificationData = new NotificationData();
    let message = {
      userId: hireRequest.workerId,
      message: hireRequest.requestMessage,
      itemId: hireRequest.id,
      ranked: false,
    };
    notifyEmployer.setDelivered(false);
    notifyEmployer.setOpened(false);
    notifyEmployer.setMessagedata(JSON.stringify(message));

    // #TODO : move constant in separate file
    notifyEmployer.setType("jobConfirmed");
    notifyEmployer.setUserid(hireRequest.employerId);

    const employerNotificationResponse = await ServiceRegistry.getInstance().services.notificationsClient.sendPushNotification(
      notifyEmployer
    );

    if (!employerNotificationResponse.getSuccess()) {
      console.log({
        action: Events.notificationOpened,
        success: false,
        message: employerNotificationResponse.getMessage(),
      });
    }

    notifyEmployer.setId(employerNotificationResponse.getId());

    newNotification.grpcNotificationData = notifyEmployer;

    ServiceRegistry.getInstance().services.eventsBus.emit(
      Events.newNotificationAdded,
      newNotification.notificationObject
    );
  }

  /**
   * On rank submitted
   * @param args array of params.
   * @param args[0] rank object. Expected type RankType
   * @param args[1] notification id
   */
  private async onRankSubmitted(...args: any[]) {
    const notificationId = args[1] as string;

    const notificationResponse = await ServiceRegistry.getInstance().services.notificationsClient.getPushNotificationById(
      notificationId
    );

    if (!notificationResponse.getSuccess()) {
      console.log({
        action: Events.notificationOpened,
        success: false,
        message: notificationResponse.getMessage(),
      });
      return;
    }

    const notification = notificationResponse.getData();

    if (
      isUndefined(notification) ||
      isUndefined(notification.getMessagedata())
    ) {
      return;
    }

    let notificationData = JSON.parse(
      notification.getMessagedata()
    ) as JobConfirmedData;

    notificationData.ranked = true;

    notification.setMessagedata(JSON.stringify(notificationData));

    const response = await ServiceRegistry.getInstance().services.notificationsClient.updatePushNotification(
      notification
    );
    if (!response.getSuccess()) {
      console.log({
        action: Events.notificationOpened,
        success: false,
        message: response.getMessage(),
      });
      return;
    }
  }
}
