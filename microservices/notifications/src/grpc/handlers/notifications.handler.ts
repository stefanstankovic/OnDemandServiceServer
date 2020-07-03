import * as grpc from "grpc";

import {
  INotificationsServer,
  NotificationsService,
} from "../_proto/notifications/notifications_grpc_pb";
import {
  NotificationData,
  EmailData,
  Response,
  UserId,
  Query,
  PushNotifications,
  Emails,
  EmailAddress,
  NotificationId,
  NotificationDataResponse,
} from "../_proto/notifications/notifications_pb";

import { EmailHelper } from "../../helpers/email.helper";
import { NotificationsHelper } from "../../helpers/notifications.helper";

class NotificationsHandler implements INotificationsServer {
  private _emailHelper: EmailHelper;
  private _notificationHelper: NotificationsHelper;

  constructor() {
    this._emailHelper = new EmailHelper();
    this._notificationHelper = new NotificationsHelper();
  }

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

  sendEmail = (
    call: grpc.ServerUnaryCall<EmailData>,
    callback: grpc.sendUnaryData<Response>
  ): void => {
    this._emailHelper.SendEmail(call.request).then((response) => {
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

  getEmailsForEmailAddress = (
    call: grpc.ServerUnaryCall<EmailAddress>,
    callback: grpc.sendUnaryData<Emails>
  ): void => {
    this._emailHelper
      .GetEmailsForEmailAddress(call.request)
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

  findEmailsForEmailByContent = (
    call: grpc.ServerUnaryCall<Query>,
    callback: grpc.sendUnaryData<Emails>
  ): void => {
    this._emailHelper
      .FindEmailsForEmailByContent(call.request)
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
