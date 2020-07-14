import * as grpc from "grpc";
import {
  INotificationsClient,
  NotificationsClient as GrpcNotificationsClient,
} from "../../grpc/_proto/notifications/notifications_grpc_pb";

import { ClientBase } from "../client.base";
import {
  Response,
  PushNotifications,
  NotificationData,
  UserId,
  Query,
  NotificationDataResponse,
  NotificationId,
  UserDeviceData,
  UserDevicesData,
  DeviceId,
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

  updatePushNotification(
    notificationData: NotificationData
  ): Promise<Response> {
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

  addUserDevice(userDeviceData: UserDeviceData): Promise<Response> {
    return new Promise<Response>((resolve, reject) => {
      this._client!.addUserDevice(
        userDeviceData,
        (error: grpc.ServiceError | null, response: Response): void => {
          if (error) {
            reject(error);
          }
          resolve(response);
        }
      );
    });
  }

  getUserDevices(id: string): Promise<UserDevicesData> {
    const userId = new UserId();
    userId.setId(id);
    return new Promise<UserDevicesData>((resolve, reject) => {
      this._client!.getUserDevices(
        userId,
        (error: grpc.ServiceError | null, response: UserDevicesData): void => {
          if (error) {
            reject(error);
          }
          resolve(response);
        }
      );
    });
  }

  removeUserDevice(id: string): Promise<Response> {
    const deviceId = new DeviceId();
    deviceId.setId(id);
    return new Promise<Response>((resolve, reject) => {
      this._client!.removeUserDevice(
        deviceId,
        (error: grpc.ServiceError | null, response: Response): void => {
          if (error) {
            reject(error);
          }
          resolve(response);
        }
      );
    });
  }
}
