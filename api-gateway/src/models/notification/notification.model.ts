import { NotificationData as GrpcNotificationData } from "../../grpc/_proto/notifications/notifications_pb";
import { isNull } from "lodash";

export type NotificationType = {
  id: string;
  userId: string;
  type: string;
  messageData: string;
  delivered: boolean;
  opened: boolean;
};

export class Notification {
  constructor(
    private _id: string | null = null,
    private _userId: string | null = null,
    private _type: string | null = null,
    private _messageData: string | null = null,
    private _delivered: boolean | null = null,
    private _opened: boolean | null = null
  ) {}

  get grpcNotificationData(): GrpcNotificationData {
    const notification = new GrpcNotificationData();
    if (!isNull(this._id)) {
      notification.setId(this._id);
    }
    notification.setUserid(this._userId!);
    notification.setType(this._type!);
    notification.setMessagedata(this._messageData!);
    notification.setDelivered(this._delivered!);
    notification.setOpened(this._opened!);

    return notification;
  }

  set grpcNotificationData(notification: GrpcNotificationData) {
    this._id = notification.getId();
    this._userId = notification.getUserid();
    this._type = notification.getType();
    this._messageData = notification.getMessagedata();
    this._delivered = notification.getDelivered();
    this._opened = notification.getOpened();
  }

  get notificationObject(): NotificationType {
    return {
      id: this._id!,
      userId: this._userId!,
      type: this._type!,
      messageData: this._messageData!,
      delivered: this._delivered!,
      opened: this._opened!,
    };
  }

  set notificationObject(notification: NotificationType) {
    this._id = notification.id;
    this._userId = notification.userId;
    this._type = notification.type;
    this._messageData = notification.messageData;
    this._delivered = notification.delivered;
    this._opened = notification.opened;
  }
}
