// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var notifications_pb = require('./notifications_pb.js');

function serialize_notifications_DeviceId(arg) {
  if (!(arg instanceof notifications_pb.DeviceId)) {
    throw new Error('Expected argument of type notifications.DeviceId');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_notifications_DeviceId(buffer_arg) {
  return notifications_pb.DeviceId.deserializeBinary(new Uint8Array(buffer_arg));
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

function serialize_notifications_UserDeviceData(arg) {
  if (!(arg instanceof notifications_pb.UserDeviceData)) {
    throw new Error('Expected argument of type notifications.UserDeviceData');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_notifications_UserDeviceData(buffer_arg) {
  return notifications_pb.UserDeviceData.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_notifications_UserDevicesData(arg) {
  if (!(arg instanceof notifications_pb.UserDevicesData)) {
    throw new Error('Expected argument of type notifications.UserDevicesData');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_notifications_UserDevicesData(buffer_arg) {
  return notifications_pb.UserDevicesData.deserializeBinary(new Uint8Array(buffer_arg));
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
  addUserDevice: {
    path: '/notifications.Notifications/AddUserDevice',
    requestStream: false,
    responseStream: false,
    requestType: notifications_pb.UserDeviceData,
    responseType: notifications_pb.Response,
    requestSerialize: serialize_notifications_UserDeviceData,
    requestDeserialize: deserialize_notifications_UserDeviceData,
    responseSerialize: serialize_notifications_Response,
    responseDeserialize: deserialize_notifications_Response,
  },
  getUserDevices: {
    path: '/notifications.Notifications/GetUserDevices',
    requestStream: false,
    responseStream: false,
    requestType: notifications_pb.UserId,
    responseType: notifications_pb.UserDevicesData,
    requestSerialize: serialize_notifications_UserId,
    requestDeserialize: deserialize_notifications_UserId,
    responseSerialize: serialize_notifications_UserDevicesData,
    responseDeserialize: deserialize_notifications_UserDevicesData,
  },
  removeUserDevice: {
    path: '/notifications.Notifications/RemoveUserDevice',
    requestStream: false,
    responseStream: false,
    requestType: notifications_pb.DeviceId,
    responseType: notifications_pb.Response,
    requestSerialize: serialize_notifications_DeviceId,
    requestDeserialize: deserialize_notifications_DeviceId,
    responseSerialize: serialize_notifications_Response,
    responseDeserialize: deserialize_notifications_Response,
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
