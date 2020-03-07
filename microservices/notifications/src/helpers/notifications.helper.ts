import Notification, { INotification } from '../models/notification.model';
import {
    NotificationData,
    PushNotifications,
    Response,
    Query,
    UserId} from '../grpc/_proto/notifications/notifications_pb';

export class NotificationsHelper {
    constructor(){}

    public async SendPushNotification(notification: NotificationData) : Promise<Response> {
        const response = new Response();
        try {
            const newNotification : INotification = new Notification({
                userId: notification.getUserid(),
                type: notification.getType(),
                data: JSON.parse(notification.getMessagedata()),
                stringData: notification.getMessagedata()
            });

            var savedNotification = await newNotification.save();
            response.setSuccess(true);
            response.setId(savedNotification._id);
        } catch (ex) {
            const err = ex as Error;
            response.setSuccess(false);
            response.setMessage(err.message);
        }

        return response;
    }

    public async GetPushNotificationForUser(userId : UserId) : Promise<PushNotifications> {
        const response = new PushNotifications();
        try {
            const query = Notification.find({userId: userId.getId()});
            const notifications = await query.exec() as Array<INotification>;
            response.setNotificationsList(this.DbNotificationsToNotificationsData(notifications));

        } catch (ex) {
            const err = ex as Error;
            response.setSuccess(false);
            response.setMessage(err.message);
        }

        return response;
    }

    public async FindPushNotificationsForUserByContent(queryData: Query) : Promise<PushNotifications> {
        const response = new PushNotifications();
        try {
            const query = Notification.find(
                {
                    userId: queryData.getUserid(),
                    stringData: { $regex: '.*' + queryData.getPartiallyconenten() + '.*' }
                });
            const notifications = await query.exec() as Array<INotification>;
            response.setNotificationsList(this.DbNotificationsToNotificationsData(notifications));
        } catch (ex) {
            const err = ex as Error;
            response.setSuccess(false);
            response.setMessage(err.message);
        }
        return response;
    }

    public async GetUndeliveredNotificationsForUser(userId : UserId)  : Promise<PushNotifications> {
        const response = new PushNotifications();
        try {
            const query = Notification.find({userId: userId.getId(), delivered: true});
            const notifications = await query.exec() as Array<INotification>;
            response.setNotificationsList(this.DbNotificationsToNotificationsData(notifications));

        } catch (ex) {
            const err = ex as Error;
            response.setSuccess(false);
            response.setMessage(err.message);
        }

        return response;
    }

    private DbNotificationsToNotificationsData(notifications: INotification[]) : Array<NotificationData>  {
        return notifications.map<NotificationData>((value: INotification) => {
            const notificationData = new NotificationData();
            notificationData.setUserid(value.userId);
            notificationData.setType(value.type);
            notificationData.setMessagedata(value.stringData);
            notificationData.setDelivered(value.delivered);
            
            return notificationData;
        });
    }
}