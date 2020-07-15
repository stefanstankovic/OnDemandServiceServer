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

export type PushNotificationType = {
  title: string;
  subtitle: string;
};

export const NOTIFICATION_TYPE = {
  HIRE_REQUEST: "hireRequest",
  HIRE_ACCEPTED: "hireAccepted",
  HIRE_REJECTED: "hireRejected",
  JOB_CONFIRMED: "jobConfirmed",
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

  get pushNotificationObject(): PushNotificationType {
    return {
      title: this.getNotificationTitle(this._type!),
      subtitle: this.getNotificationSubtitle(this._type!, this._messageData!),
    };
  }

  private getNotificationTitle = (type: string): string => {
    switch (type) {
      case NOTIFICATION_TYPE.HIRE_REQUEST:
        return "Work Request";
      case NOTIFICATION_TYPE.HIRE_ACCEPTED:
        return "Job Accepted";
      case NOTIFICATION_TYPE.HIRE_REJECTED:
        return "Job Rejected";
      case NOTIFICATION_TYPE.JOB_CONFIRMED:
        return "Job is finished!";
      default:
        return "Notification";
    }
  };

  getNotificationSubtitle = (type: string, messageData: string) => {
    let messageObject: { message: string } = { message: "" };
    switch (type) {
      case NOTIFICATION_TYPE.HIRE_REQUEST:
        messageObject = JSON.parse(messageData) as { message: string };
        let splittedMessage = messageObject.message.split("|");
        let newMessage =
          `When: ${splittedMessage[0]}, ` +
          `Where: ${splittedMessage[1]}, ` +
          `Comment: ${splittedMessage[2]}`;

        return newMessage.substr(0, 30) + "...";
      case NOTIFICATION_TYPE.HIRE_REJECTED:
      case NOTIFICATION_TYPE.HIRE_ACCEPTED:
        messageObject = JSON.parse(messageData);
        return messageObject.message.substr(0, 30) + "...";
      case NOTIFICATION_TYPE.JOB_CONFIRMED:
        return "Please add your rank.";
      default:
        return "Notification";
    }
  };
}
