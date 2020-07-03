// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var notifications_pb = require('./notifications_pb.js');

function serialize_notifications_EmailAddress(arg) {
  if (!(arg instanceof notifications_pb.EmailAddress)) {
    throw new Error('Expected argument of type notifications.EmailAddress');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_notifications_EmailAddress(buffer_arg) {
  return notifications_pb.EmailAddress.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_notifications_EmailData(arg) {
  if (!(arg instanceof notifications_pb.EmailData)) {
    throw new Error('Expected argument of type notifications.EmailData');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_notifications_EmailData(buffer_arg) {
  return notifications_pb.EmailData.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_notifications_Emails(arg) {
  if (!(arg instanceof notifications_pb.Emails)) {
    throw new Error('Expected argument of type notifications.Emails');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_notifications_Emails(buffer_arg) {
  return notifications_pb.Emails.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_notifications_NotificationData(arg) {
  if (!(arg instanceof notifications_pb.NotificationData)) {
    throw new Error('Expected argument of type notifications.NotificationData');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_notifications_NotificationData(buffer_arg) {
  return notifications_pb.NotificationData.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_notifications_NotificationDataResponse(arg) {
  if (!(arg instanceof notifications_pb.NotificationDataResponse)) {
    throw new Error('Expected argument of type notifications.NotificationDataResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_notifications_NotificationDataResponse(buffer_arg) {
  return notifications_pb.NotificationDataResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_notifications_NotificationId(arg) {
  if (!(arg instanceof notifications_pb.NotificationId)) {
    throw new Error('Expected argument of type notifications.NotificationId');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_notifications_NotificationId(buffer_arg) {
  return notifications_pb.NotificationId.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_notifications_PushNotifications(arg) {
  if (!(arg instanceof notifications_pb.PushNotifications)) {
    throw new Error('Expected argument of type notifications.PushNotifications');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_notifications_PushNotifications(buffer_arg) {
  return notifications_pb.PushNotifications.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_notifications_Query(arg) {
  if (!(arg instanceof notifications_pb.Query)) {
    throw new Error('Expected argument of type notifications.Query');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_notifications_Query(buffer_arg) {
  return notifications_pb.Query.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_notifications_Response(arg) {
  if (!(arg instanceof notifications_pb.Response)) {
    throw new Error('Expected argument of type notifications.Response');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_notifications_Response(buffer_arg) {
  return notifications_pb.Response.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_notifications_UserId(arg) {
  if (!(arg instanceof notifications_pb.UserId)) {
    throw new Error('Expected argument of type notifications.UserId');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_notifications_UserId(buffer_arg) {
  return notifications_pb.UserId.deserializeBinary(new Uint8Array(buffer_arg));
}


var NotificationsService = exports.NotificationsService = {
  sendEmail: {
    path: '/notifications.Notifications/SendEmail',
    requestStream: false,
    responseStream: false,
    requestType: notifications_pb.EmailData,
    responseType: notifications_pb.Response,
    requestSerialize: serialize_notifications_EmailData,
    requestDeserialize: deserialize_notifications_EmailData,
    responseSerialize: serialize_notifications_Response,
    responseDeserialize: deserialize_notifications_Response,
  },
  getEmailsForEmailAddress: {
    path: '/notifications.Notifications/GetEmailsForEmailAddress',
    requestStream: false,
    responseStream: false,
    requestType: notifications_pb.EmailAddress,
    responseType: notifications_pb.Emails,
    requestSerialize: serialize_notifications_EmailAddress,
    requestDeserialize: deserialize_notifications_EmailAddress,
    responseSerialize: serialize_notifications_Emails,
    responseDeserialize: deserialize_notifications_Emails,
  },
  findEmailsForEmailByContent: {
    path: '/notifications.Notifications/FindEmailsForEmailByContent',
    requestStream: false,
    responseStream: false,
    requestType: notifications_pb.Query,
    responseType: notifications_pb.Emails,
    requestSerialize: serialize_notifications_Query,
    requestDeserialize: deserialize_notifications_Query,
    responseSerialize: serialize_notifications_Emails,
    responseDeserialize: deserialize_notifications_Emails,
  },
  getPushNotificationById: {
    path: '/notifications.Notifications/GetPushNotificationById',
    requestStream: false,
    responseStream: false,
    requestType: notifications_pb.NotificationId,
    responseType: notifications_pb.NotificationDataResponse,
    requestSerialize: serialize_notifications_NotificationId,
    requestDeserialize: deserialize_notifications_NotificationId,
    responseSerialize: serialize_notifications_NotificationDataResponse,
    responseDeserialize: deserialize_notifications_NotificationDataResponse,
  },
  sendPushNotification: {
    path: '/notifications.Notifications/SendPushNotification',
    requestStream: false,
    responseStream: false,
    requestType: notifications_pb.NotificationData,
    responseType: notifications_pb.Response,
    requestSerialize: serialize_notifications_NotificationData,
    requestDeserialize: deserialize_notifications_NotificationData,
    responseSerialize: serialize_notifications_Response,
    responseDeserialize: deserialize_notifications_Response,
  },
  getPushNotificationsForUser: {
    path: '/notifications.Notifications/GetPushNotificationsForUser',
    requestStream: false,
    responseStream: false,
    requestType: notifications_pb.UserId,
    responseType: notifications_pb.PushNotifications,
    requestSerialize: serialize_notifications_UserId,
    requestDeserialize: deserialize_notifications_UserId,
    responseSerialize: serialize_notifications_PushNotifications,
    responseDeserialize: deserialize_notifications_PushNotifications,
  },
  findPushNotificationsForUser: {
    path: '/notifications.Notifications/FindPushNotificationsForUser',
    requestStream: false,
    responseStream: false,
    requestType: notifications_pb.Query,
    responseType: notifications_pb.PushNotifications,
    requestSerialize: serialize_notifications_Query,
    requestDeserialize: deserialize_notifications_Query,
    responseSerialize: serialize_notifications_PushNotifications,
    responseDeserialize: deserialize_notifications_PushNotifications,
  },
  getUndeliveredNotificationsForUser: {
    path: '/notifications.Notifications/GetUndeliveredNotificationsForUser',
    requestStream: false,
    responseStream: false,
    requestType: notifications_pb.UserId,
    responseType: notifications_pb.PushNotifications,
    requestSerialize: serialize_notifications_UserId,
    requestDeserialize: deserialize_notifications_UserId,
    responseSerialize: serialize_notifications_PushNotifications,
    responseDeserialize: deserialize_notifications_PushNotifications,
  },
  updatePushNotification: {
    path: '/notifications.Notifications/UpdatePushNotification',
    requestStream: false,
    responseStream: false,
    requestType: notifications_pb.NotificationData,
    responseType: notifications_pb.Response,
    requestSerialize: serialize_notifications_NotificationData,
    requestDeserialize: deserialize_notifications_NotificationData,
    responseSerialize: serialize_notifications_Response,
    responseDeserialize: deserialize_notifications_Response,
  },
};

exports.NotificationsClient = grpc.makeGenericClientConstructor(NotificationsService);
