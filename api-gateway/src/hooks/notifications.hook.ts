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

export class NotificationsHook {
  private _evensBus: EventEmitter;

  constructor(private _services: Services) {
    this._evensBus = this._services.eventsBus;

    this._evensBus.on(Events.userConnectedOnSocket, this.userConnected);
    this._evensBus.on(Events.workerHireRequest, this.hireRequest);
    this._evensBus.on(Events.workerAcceptedHireRequest, this.onHireResponse);
    this._evensBus.on(Events.workerRejectedHireRequest, this.onHireResponse);
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
   * @param args array of params.
   * @param args[0] hire request object. Expected type HireRequestType
   */
  private async hireRequest(...args: any[]) {
    const hireRequest: HireRequestType = args[0] as HireRequestType;

    if (isNil(hireRequest)) {
      return;
    }

    try {
      ServiceRegistry.getInstance().services.eventsBus.emit(
        Events.notifyUser,
        hireRequest.employerId,
        hireRequest
      );
    } catch (ex) {
      const err = ex as Error;
      console.log(err.message);
    }

    const pushNotification: NotificationData = new NotificationData();
    pushNotification.setDelivered(false);
    pushNotification.setMessagedata(JSON.stringify(hireRequest.requestMessage));
    pushNotification.setType("hire");
    pushNotification.setUserid(hireRequest.employerId);

    const response = await ServiceRegistry.getInstance().services.notificationsClient.sendPushNotification(
      pushNotification
    );
  }

  /**
   * On change location event handler
   * @param args array of params.
   * @param args[0] hire request object. Expected type HireRequestType
   * @param args[1] hire response object. Expected type HireResponseType
   */
  private async onHireResponse(...args: any[]) {}
}
