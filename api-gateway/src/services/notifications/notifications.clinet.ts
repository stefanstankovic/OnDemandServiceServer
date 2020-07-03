import * as grpc from "grpc";
import {
  INotificationsClient,
  NotificationsClient as GrpcNotificationsClient,
} from "../../grpc/_proto/notifications/notifications_grpc_pb";

import { ClientBase } from "../client.base";
import {
  Response,
  PushNotifications,
  Emails,
  NotificationData,
  EmailData,
  UserId,
  EmailAddress,
  Query,
  NotificationDataResponse,
  NotificationId,
} from "../../grpc/_proto/notifications/notifications_pb";

export class NotificationClient extends ClientBase<INotificationsClient> {
  constructor(
    notificationServiceIp: string,
    notificationServicePort: string,
    credentials: grpc.ChannelCredentials
  ) {
    super(notificationServiceIp, notificationServicePort, credentials);

    this._client = new GrpcNotificationsClient(
      `${this._serviceIp}:${this._servicePort}`,
      this._credentials
    );
  }

  sendPushNotification(pushNotification: NotificationData): Promise<Response> {
    return new Promise<Response>((resolve, reject) => {
      this._client!.sendPushNotification(
        pushNotification,
        (error: grpc.ServiceError | null, response: Response): void => {
          if (error) {
            reject(error);
          }
          resolve(response);
        }
      );
    });
  }

  sendEmail(email: EmailData): Promise<Response> {
    return new Promise<Response>((resolve, reject) => {
      this._client!.sendEmail(
        email,
        (error: grpc.ServiceError | null, response: Response): void => {
          if (error) {
            reject(error);
          }
          resolve(response);
        }
      );
    });
  }

  getPushNotificationsForUser(userId: string): Promise<PushNotifications> {
    const grpcUserId: UserId = new UserId();
    grpcUserId.setId(userId);

    return new Promise<PushNotifications>((resolve, reject) => {
      this._client!.getPushNotificationsForUser(
        grpcUserId,
        (
          error: grpc.ServiceError | null,
          response: PushNotifications
        ): void => {
          if (error) {
            reject(error);
          }
          resolve(response);
        }
      );
    });
  }

  getUndeliveredNotificationsForUser(
    userId: string
  ): Promise<PushNotifications> {
    const grpcUserId: UserId = new UserId();
    grpcUserId.setId(userId);

    return new Promise<PushNotifications>((resolve, reject) => {
      this._client!.getUndeliveredNotificationsForUser(
        grpcUserId,
        (
          error: grpc.ServiceError | null,
          response: PushNotifications
        ): void => {
          if (error) {
            reject(error);
          }
          resolve(response);
        }
      );
    });
  }

  getEmailsForEmailAddress(email: string): Promise<Emails> {
    const emailAddress: EmailAddress = new EmailAddress();
    emailAddress.setEmail(email);

    return new Promise<Emails>((resolve, reject) => {
      this._client!.getEmailsForEmailAddress(
        emailAddress,
        (error: grpc.ServiceError | null, response: Emails): void => {
          if (error) {
            reject(error);
          }
          resolve(response);
        }
      );
    });
  }

  findPushNotificationsForUser(
    userId: string,
    pattern: string
  ): Promise<PushNotifications> {
    const query = new Query();
    query.setUserid(userId);
    query.setPartiallycontenten(pattern);

    return new Promise<PushNotifications>((resolve, reject) => {
      this._client!.findPushNotificationsForUser(
        query,
        (
          error: grpc.ServiceError | null,
          response: PushNotifications
        ): void => {
          if (error) {
            reject(error);
          }
          resolve(response);
        }
      );
    });
  }

  findEmailsForEmailByContent(email: string, pattern: string): Promise<Emails> {
    const query = new Query();
    query.setEmail(email);
    query.setPartiallycontenten(pattern);

    return new Promise<Emails>((resolve, reject) => {
      this._client!.findEmailsForEmailByContent(
        query,
        (error: grpc.ServiceError | null, response: Emails): void => {
          if (error) {
            reject(error);
          }
          resolve(response);
        }
      );
    });
  }

  updatePushNotification(id: string): Promise<Response> {
    const notificationData = new NotificationData();
    notificationData.setId(id);
    notificationData.setDelivered(true);
    return new Promise<Response>((resolve, reject) => {
      this._client!.updatePushNotification(
        notificationData,
        (error: grpc.ServiceError | null, response: Response): void => {
          if (error) {
            reject(error);
          }
          resolve(response);
        }
      );
    });
  }

  getPushNotificationById(id: string): Promise<NotificationDataResponse> {
    const notificationId = new NotificationId();
    notificationId.setId(id);
    return new Promise<NotificationDataResponse>((resolve, reject) => {
      this._client!.getPushNotificationById(
        notificationId,
        (
          error: grpc.ServiceError | null,
          response: NotificationDataResponse
        ): void => {
          if (error) {
            reject(error);
          }
          resolve(response);
        }
      );
    });
  }
}
