import { NotificationData as GrpcNotificationData } from "../../grpc/_proto/notifications/notifications_pb";
import { isNull } from "lodash";

export type NotificationType = {
  id: string;
  userId: string;
  type: string;
  messageData: string;
  delivered: boolean;
};

export class Notification {
  constructor(
    private _id: string | null = null,
    private _userId: string | null = null,
    private _type: string | null = null,
    private _messageData: string | null = null,
    private _delivered: boolean | null = null
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

    return notification;
  }

  set grpcNotificationData(rank: GrpcNotificationData) {
    this._id = rank.getId();
    this._userId = rank.getUserid();
    this._type = rank.getType();
    this._messageData = rank.getMessagedata();
    this._delivered = rank.getDelivered();
  }

  get notificationObject(): NotificationType {
    return {
      id: this._id!,
      userId: this._userId!,
      type: this._type!,
      messageData: this._messageData!,
      delivered: this._delivered!,
    };
  }

  set notificationObject(notification: NotificationType) {
    this._id = notification.id;
    this._userId = notification.userId;
    this._type = notification.type;
    this._messageData = notification.messageData;
    this._delivered = notification.delivered;
  }
}
