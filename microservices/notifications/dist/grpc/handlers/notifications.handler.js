"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notifications_grpc_pb_1 = require("../_proto/notifications/notifications_grpc_pb");
const email_helper_1 = require("../../helpers/email.helper");
const notifications_helper_1 = require("../../helpers/notifications.helper");
class NotificationsHandler {
    constructor() {
        this.sendPushNotification = (call, callback) => {
            this._notificationHelper
                .SendPushNotification(call.request)
                .then((response) => {
                callback(null, response);
            });
        };
        this.sendEmail = (call, callback) => {
            this._emailHelper.SendEmail(call.request).then((response) => {
                callback(null, response);
            });
        };
        this.getPushNotificationsForUser = (call, callback) => {
            this._notificationHelper
                .GetPushNotificationForUser(call.request)
                .then((response) => {
                callback(null, response);
            });
        };
        this.getEmailsForEmailAddress = (call, callback) => {
            this._emailHelper
                .GetEmailsForEmailAddress(call.request)
                .then((response) => {
                callback(null, response);
            });
        };
        this.findPushNotificationsForUser = (call, callback) => {
            this._notificationHelper
                .FindPushNotificationsForUser(call.request)
                .then((response) => {
                callback(null, response);
            });
        };
        this.findEmailsForEmailByContent = (call, callback) => {
            this._emailHelper
                .FindEmailsForEmailByContent(call.request)
                .then((response) => {
                callback(null, response);
            });
        };
        this.getUndeliveredNotificationsForUser = (call, callback) => {
            this._notificationHelper
                .GetUndeliveredNotificationsForUser(call.request)
                .then((response) => {
                callback(null, response);
            });
        };
        this.updatePushNotification = (call, callback) => {
            this._notificationHelper
                .UpdatePushNotification(call.request)
                .then((response) => {
                callback(null, response);
            });
        };
        this.getPushNotificationById = (call, callback) => {
            this._notificationHelper
                .GetPushNotificationById(call.request)
                .then((response) => {
                callback(null, response);
            });
        };
        this._emailHelper = new email_helper_1.EmailHelper();
        this._notificationHelper = new notifications_helper_1.NotificationsHelper();
    }
}
exports.default = {
    server: notifications_grpc_pb_1.NotificationsService,
    handler: new NotificationsHandler(),
};
//# sourceMappingURL=notifications.handler.js.map