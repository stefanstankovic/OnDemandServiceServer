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
} from "../models/notification/notification.model";

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
  }

  /**
   * On connect event handler
   * @param args array of arguments
   * @param args[0] connected user. Expected type UserType
   */
  private async userConnected(...args: any[]) {
    const user: UserType = args[0] as UserType;

    if (isNil(user) || isNil(user.id)) {
      return;
    }

    const userNotifications: PushNotifications = await ServiceRegistry.getInstance().services.notificationsClient.getPushNotificationsForUser(
      user.id
    );

    if (userNotifications.getNotificationsList().length == 0) {
      return;
    }
  }

  /**
   * @param args array of params
   * @param args[0] new Notification. Expected type NotificationType
   */
  private async newNotificationAdded(...args: any[]) {
    const notification = args[0] as NotificationType;

    try {
      ServiceRegistry.getInstance().services.eventsBus.emit(
        Events.notifyUser,
        notification.userId,
        notification
      );
    } catch (ex) {
      const err = ex as Error;
      console.log(err.message);
    }
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
   * On change location event handler
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
   * On change location event handler
   * @param args array of params.
   * @param args[0] Notification ID
   */
  private async onGetNotification(...args: any[]) {
    let notificationId = args[0];
    let response = await ServiceRegistry.getInstance().services.notificationsClient.updatePushNotification(
      notificationId
    );

    if (!response.getSuccess()) {
      console.log({
        action: Events.notificationOpened,
        success: false,
        message: response.getMessage(),
      });
    }
  }

  /**
   * On change location event handler
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
    };
    notifyWorker.setDelivered(false);
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
      userId: hireRequest.employerId,
      message: hireRequest.requestMessage,
      itemId: hireRequest.id,
    };
    notifyEmployer.setDelivered(false);
    notifyEmployer.setMessagedata(JSON.stringify(message));

    // #TODO : move constant in separate file
    notifyEmployer.setType("jobConfirmed");
    notifyEmployer.setUserid(hireRequest.workerId);

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
}
