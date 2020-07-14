import * as grpc from "grpc";

import {
  INotificationsServer,
  NotificationsService,
} from "../_proto/notifications/notifications_grpc_pb";
import {
  NotificationData,
  UserDeviceData,
  Response,
  UserId,
  Query,
  PushNotifications,
  UserDevicesData,
  DeviceId,
  NotificationId,
  NotificationDataResponse,
} from "../_proto/notifications/notifications_pb";

import { UserDeviceHelper } from "../../helpers/userDevice.helper";
import { NotificationsHelper } from "../../helpers/notifications.helper";

class NotificationsHandler implements INotificationsServer {
  private _notificationHelper: NotificationsHelper;
  private _userDeviceHelper: UserDeviceHelper;

  constructor() {
    this._userDeviceHelper = new UserDeviceHelper();
    this._notificationHelper = new NotificationsHelper();
  }
  addUserDevice = (
    call: grpc.ServerUnaryCall<UserDeviceData>,
    callback: grpc.sendUnaryData<Response>
  ): void => {
    this._userDeviceHelper.AddUserDevice(call.request).then((response) => {
      callback(null, response);
    });
  };

  getUserDevices = (
    call: grpc.ServerUnaryCall<UserId>,
    callback: grpc.sendUnaryData<UserDevicesData>
  ): void => {
    this._userDeviceHelper.GetUserDevices(call.request).then((response) => {
      callback(null, response);
    });
  };

  removeUserDevice = (
    call: grpc.ServerUnaryCall<DeviceId>,
    callback: grpc.sendUnaryData<Response>
  ): void => {
    this._userDeviceHelper.RemoveUserDevice(call.request).then((response) => {
      callback(null, response);
    });
  };

  sendPushNotification = (
    call: grpc.ServerUnaryCall<NotificationData>,
    callback: grpc.sendUnaryData<Response>
  ): void => {
    this._notificationHelper
      .SendPushNotification(call.request)
      .then((response) => {
        callback(null, response);
      });
  };

  getPushNotificationsForUser = (
    call: grpc.ServerUnaryCall<UserId>,
    callback: grpc.sendUnaryData<PushNotifications>
  ): void => {
    this._notificationHelper
      .GetPushNotificationForUser(call.request)
      .then((response) => {
        callback(null, response);
      });
  };

  findPushNotificationsForUser = (
    call: grpc.ServerUnaryCall<Query>,
    callback: grpc.sendUnaryData<PushNotifications>
  ): void => {
    this._notificationHelper
      .FindPushNotificationsForUser(call.request)
      .then((response) => {
        callback(null, response);
      });
  };

  getUndeliveredNotificationsForUser = (
    call: grpc.ServerUnaryCall<UserId>,
    callback: grpc.sendUnaryData<PushNotifications>
  ): void => {
    this._notificationHelper
      .GetUndeliveredNotificationsForUser(call.request)
      .then((response) => {
        callback(null, response);
      });
  };

  updatePushNotification = (
    call: grpc.ServerUnaryCall<NotificationData>,
    callback: grpc.sendUnaryData<Response>
  ): void => {
    this._notificationHelper
      .UpdatePushNotification(call.request)
      .then((response) => {
        callback(null, response);
      });
  };

  getPushNotificationById = (
    call: grpc.ServerUnaryCall<NotificationId>,
    callback: grpc.sendUnaryData<NotificationDataResponse>
  ): void => {
    this._notificationHelper
      .GetPushNotificationById(call.request)
      .then((response) => {
        callback(null, response);
      });
  };
}

export default {
  server: NotificationsService,
  handler: new NotificationsHandler(),
};
