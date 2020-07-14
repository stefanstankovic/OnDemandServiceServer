// package: notifications
// file: notifications.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as notifications_pb from "./notifications_pb";

interface INotificationsService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    addUserDevice: INotificationsService_IAddUserDevice;
    getUserDevices: INotificationsService_IGetUserDevices;
    removeUserDevice: INotificationsService_IRemoveUserDevice;
    getPushNotificationById: INotificationsService_IGetPushNotificationById;
    sendPushNotification: INotificationsService_ISendPushNotification;
    getPushNotificationsForUser: INotificationsService_IGetPushNotificationsForUser;
    findPushNotificationsForUser: INotificationsService_IFindPushNotificationsForUser;
    getUndeliveredNotificationsForUser: INotificationsService_IGetUndeliveredNotificationsForUser;
    updatePushNotification: INotificationsService_IUpdatePushNotification;
}

interface INotificationsService_IAddUserDevice extends grpc.MethodDefinition<notifications_pb.UserDeviceData, notifications_pb.Response> {
    path: string; // "/notifications.Notifications/AddUserDevice"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<notifications_pb.UserDeviceData>;
    requestDeserialize: grpc.deserialize<notifications_pb.UserDeviceData>;
    responseSerialize: grpc.serialize<notifications_pb.Response>;
    responseDeserialize: grpc.deserialize<notifications_pb.Response>;
}
interface INotificationsService_IGetUserDevices extends grpc.MethodDefinition<notifications_pb.UserId, notifications_pb.UserDevicesData> {
    path: string; // "/notifications.Notifications/GetUserDevices"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<notifications_pb.UserId>;
    requestDeserialize: grpc.deserialize<notifications_pb.UserId>;
    responseSerialize: grpc.serialize<notifications_pb.UserDevicesData>;
    responseDeserialize: grpc.deserialize<notifications_pb.UserDevicesData>;
}
interface INotificationsService_IRemoveUserDevice extends grpc.MethodDefinition<notifications_pb.DeviceId, notifications_pb.Response> {
    path: string; // "/notifications.Notifications/RemoveUserDevice"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<notifications_pb.DeviceId>;
    requestDeserialize: grpc.deserialize<notifications_pb.DeviceId>;
    responseSerialize: grpc.serialize<notifications_pb.Response>;
    responseDeserialize: grpc.deserialize<notifications_pb.Response>;
}
interface INotificationsService_IGetPushNotificationById extends grpc.MethodDefinition<notifications_pb.NotificationId, notifications_pb.NotificationDataResponse> {
    path: string; // "/notifications.Notifications/GetPushNotificationById"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<notifications_pb.NotificationId>;
    requestDeserialize: grpc.deserialize<notifications_pb.NotificationId>;
    responseSerialize: grpc.serialize<notifications_pb.NotificationDataResponse>;
    responseDeserialize: grpc.deserialize<notifications_pb.NotificationDataResponse>;
}
interface INotificationsService_ISendPushNotification extends grpc.MethodDefinition<notifications_pb.NotificationData, notifications_pb.Response> {
    path: string; // "/notifications.Notifications/SendPushNotification"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<notifications_pb.NotificationData>;
    requestDeserialize: grpc.deserialize<notifications_pb.NotificationData>;
    responseSerialize: grpc.serialize<notifications_pb.Response>;
    responseDeserialize: grpc.deserialize<notifications_pb.Response>;
}
interface INotificationsService_IGetPushNotificationsForUser extends grpc.MethodDefinition<notifications_pb.UserId, notifications_pb.PushNotifications> {
    path: string; // "/notifications.Notifications/GetPushNotificationsForUser"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<notifications_pb.UserId>;
    requestDeserialize: grpc.deserialize<notifications_pb.UserId>;
    responseSerialize: grpc.serialize<notifications_pb.PushNotifications>;
    responseDeserialize: grpc.deserialize<notifications_pb.PushNotifications>;
}
interface INotificationsService_IFindPushNotificationsForUser extends grpc.MethodDefinition<notifications_pb.Query, notifications_pb.PushNotifications> {
    path: string; // "/notifications.Notifications/FindPushNotificationsForUser"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<notifications_pb.Query>;
    requestDeserialize: grpc.deserialize<notifications_pb.Query>;
    responseSerialize: grpc.serialize<notifications_pb.PushNotifications>;
    responseDeserialize: grpc.deserialize<notifications_pb.PushNotifications>;
}
interface INotificationsService_IGetUndeliveredNotificationsForUser extends grpc.MethodDefinition<notifications_pb.UserId, notifications_pb.PushNotifications> {
    path: string; // "/notifications.Notifications/GetUndeliveredNotificationsForUser"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<notifications_pb.UserId>;
    requestDeserialize: grpc.deserialize<notifications_pb.UserId>;
    responseSerialize: grpc.serialize<notifications_pb.PushNotifications>;
    responseDeserialize: grpc.deserialize<notifications_pb.PushNotifications>;
}
interface INotificationsService_IUpdatePushNotification extends grpc.MethodDefinition<notifications_pb.NotificationData, notifications_pb.Response> {
    path: string; // "/notifications.Notifications/UpdatePushNotification"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<notifications_pb.NotificationData>;
    requestDeserialize: grpc.deserialize<notifications_pb.NotificationData>;
    responseSerialize: grpc.serialize<notifications_pb.Response>;
    responseDeserialize: grpc.deserialize<notifications_pb.Response>;
}

export const NotificationsService: INotificationsService;

export interface INotificationsServer {
    addUserDevice: grpc.handleUnaryCall<notifications_pb.UserDeviceData, notifications_pb.Response>;
    getUserDevices: grpc.handleUnaryCall<notifications_pb.UserId, notifications_pb.UserDevicesData>;
    removeUserDevice: grpc.handleUnaryCall<notifications_pb.DeviceId, notifications_pb.Response>;
    getPushNotificationById: grpc.handleUnaryCall<notifications_pb.NotificationId, notifications_pb.NotificationDataResponse>;
    sendPushNotification: grpc.handleUnaryCall<notifications_pb.NotificationData, notifications_pb.Response>;
    getPushNotificationsForUser: grpc.handleUnaryCall<notifications_pb.UserId, notifications_pb.PushNotifications>;
    findPushNotificationsForUser: grpc.handleUnaryCall<notifications_pb.Query, notifications_pb.PushNotifications>;
    getUndeliveredNotificationsForUser: grpc.handleUnaryCall<notifications_pb.UserId, notifications_pb.PushNotifications>;
    updatePushNotification: grpc.handleUnaryCall<notifications_pb.NotificationData, notifications_pb.Response>;
}

export interface INotificationsClient {
    addUserDevice(request: notifications_pb.UserDeviceData, callback: (error: grpc.ServiceError | null, response: notifications_pb.Response) => void): grpc.ClientUnaryCall;
    addUserDevice(request: notifications_pb.UserDeviceData, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: notifications_pb.Response) => void): grpc.ClientUnaryCall;
    addUserDevice(request: notifications_pb.UserDeviceData, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: notifications_pb.Response) => void): grpc.ClientUnaryCall;
    getUserDevices(request: notifications_pb.UserId, callback: (error: grpc.ServiceError | null, response: notifications_pb.UserDevicesData) => void): grpc.ClientUnaryCall;
    getUserDevices(request: notifications_pb.UserId, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: notifications_pb.UserDevicesData) => void): grpc.ClientUnaryCall;
    getUserDevices(request: notifications_pb.UserId, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: notifications_pb.UserDevicesData) => void): grpc.ClientUnaryCall;
    removeUserDevice(request: notifications_pb.DeviceId, callback: (error: grpc.ServiceError | null, response: notifications_pb.Response) => void): grpc.ClientUnaryCall;
    removeUserDevice(request: notifications_pb.DeviceId, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: notifications_pb.Response) => void): grpc.ClientUnaryCall;
    removeUserDevice(request: notifications_pb.DeviceId, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: notifications_pb.Response) => void): grpc.ClientUnaryCall;
    getPushNotificationById(request: notifications_pb.NotificationId, callback: (error: grpc.ServiceError | null, response: notifications_pb.NotificationDataResponse) => void): grpc.ClientUnaryCall;
    getPushNotificationById(request: notifications_pb.NotificationId, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: notifications_pb.NotificationDataResponse) => void): grpc.ClientUnaryCall;
    getPushNotificationById(request: notifications_pb.NotificationId, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: notifications_pb.NotificationDataResponse) => void): grpc.ClientUnaryCall;
    sendPushNotification(request: notifications_pb.NotificationData, callback: (error: grpc.ServiceError | null, response: notifications_pb.Response) => void): grpc.ClientUnaryCall;
    sendPushNotification(request: notifications_pb.NotificationData, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: notifications_pb.Response) => void): grpc.ClientUnaryCall;
    sendPushNotification(request: notifications_pb.NotificationData, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: notifications_pb.Response) => void): grpc.ClientUnaryCall;
    getPushNotificationsForUser(request: notifications_pb.UserId, callback: (error: grpc.ServiceError | null, response: notifications_pb.PushNotifications) => void): grpc.ClientUnaryCall;
    getPushNotificationsForUser(request: notifications_pb.UserId, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: notifications_pb.PushNotifications) => void): grpc.ClientUnaryCall;
    getPushNotificationsForUser(request: notifications_pb.UserId, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: notifications_pb.PushNotifications) => void): grpc.ClientUnaryCall;
    findPushNotificationsForUser(request: notifications_pb.Query, callback: (error: grpc.ServiceError | null, response: notifications_pb.PushNotifications) => void): grpc.ClientUnaryCall;
    findPushNotificationsForUser(request: notifications_pb.Query, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: notifications_pb.PushNotifications) => void): grpc.ClientUnaryCall;
    findPushNotificationsForUser(request: notifications_pb.Query, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: notifications_pb.PushNotifications) => void): grpc.ClientUnaryCall;
    getUndeliveredNotificationsForUser(request: notifications_pb.UserId, callback: (error: grpc.ServiceError | null, response: notifications_pb.PushNotifications) => void): grpc.ClientUnaryCall;
    getUndeliveredNotificationsForUser(request: notifications_pb.UserId, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: notifications_pb.PushNotifications) => void): grpc.ClientUnaryCall;
    getUndeliveredNotificationsForUser(request: notifications_pb.UserId, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: notifications_pb.PushNotifications) => void): grpc.ClientUnaryCall;
    updatePushNotification(request: notifications_pb.NotificationData, callback: (error: grpc.ServiceError | null, response: notifications_pb.Response) => void): grpc.ClientUnaryCall;
    updatePushNotification(request: notifications_pb.NotificationData, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: notifications_pb.Response) => void): grpc.ClientUnaryCall;
    updatePushNotification(request: notifications_pb.NotificationData, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: notifications_pb.Response) => void): grpc.ClientUnaryCall;
}

export class NotificationsClient extends grpc.Client implements INotificationsClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public addUserDevice(request: notifications_pb.UserDeviceData, callback: (error: grpc.ServiceError | null, response: notifications_pb.Response) => void): grpc.ClientUnaryCall;
    public addUserDevice(request: notifications_pb.UserDeviceData, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: notifications_pb.Response) => void): grpc.ClientUnaryCall;
    public addUserDevice(request: notifications_pb.UserDeviceData, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: notifications_pb.Response) => void): grpc.ClientUnaryCall;
    public getUserDevices(request: notifications_pb.UserId, callback: (error: grpc.ServiceError | null, response: notifications_pb.UserDevicesData) => void): grpc.ClientUnaryCall;
    public getUserDevices(request: notifications_pb.UserId, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: notifications_pb.UserDevicesData) => void): grpc.ClientUnaryCall;
    public getUserDevices(request: notifications_pb.UserId, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: notifications_pb.UserDevicesData) => void): grpc.ClientUnaryCall;
    public removeUserDevice(request: notifications_pb.DeviceId, callback: (error: grpc.ServiceError | null, response: notifications_pb.Response) => void): grpc.ClientUnaryCall;
    public removeUserDevice(request: notifications_pb.DeviceId, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: notifications_pb.Response) => void): grpc.ClientUnaryCall;
    public removeUserDevice(request: notifications_pb.DeviceId, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: notifications_pb.Response) => void): grpc.ClientUnaryCall;
    public getPushNotificationById(request: notifications_pb.NotificationId, callback: (error: grpc.ServiceError | null, response: notifications_pb.NotificationDataResponse) => void): grpc.ClientUnaryCall;
    public getPushNotificationById(request: notifications_pb.NotificationId, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: notifications_pb.NotificationDataResponse) => void): grpc.ClientUnaryCall;
    public getPushNotificationById(request: notifications_pb.NotificationId, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: notifications_pb.NotificationDataResponse) => void): grpc.ClientUnaryCall;
    public sendPushNotification(request: notifications_pb.NotificationData, callback: (error: grpc.ServiceError | null, response: notifications_pb.Response) => void): grpc.ClientUnaryCall;
    public sendPushNotification(request: notifications_pb.NotificationData, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: notifications_pb.Response) => void): grpc.ClientUnaryCall;
    public sendPushNotification(request: notifications_pb.NotificationData, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: notifications_pb.Response) => void): grpc.ClientUnaryCall;
    public getPushNotificationsForUser(request: notifications_pb.UserId, callback: (error: grpc.ServiceError | null, response: notifications_pb.PushNotifications) => void): grpc.ClientUnaryCall;
    public getPushNotificationsForUser(request: notifications_pb.UserId, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: notifications_pb.PushNotifications) => void): grpc.ClientUnaryCall;
    public getPushNotificationsForUser(request: notifications_pb.UserId, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: notifications_pb.PushNotifications) => void): grpc.ClientUnaryCall;
    public findPushNotificationsForUser(request: notifications_pb.Query, callback: (error: grpc.ServiceError | null, response: notifications_pb.PushNotifications) => void): grpc.ClientUnaryCall;
    public findPushNotificationsForUser(request: notifications_pb.Query, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: notifications_pb.PushNotifications) => void): grpc.ClientUnaryCall;
    public findPushNotificationsForUser(request: notifications_pb.Query, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: notifications_pb.PushNotifications) => void): grpc.ClientUnaryCall;
    public getUndeliveredNotificationsForUser(request: notifications_pb.UserId, callback: (error: grpc.ServiceError | null, response: notifications_pb.PushNotifications) => void): grpc.ClientUnaryCall;
    public getUndeliveredNotificationsForUser(request: notifications_pb.UserId, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: notifications_pb.PushNotifications) => void): grpc.ClientUnaryCall;
    public getUndeliveredNotificationsForUser(request: notifications_pb.UserId, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: notifications_pb.PushNotifications) => void): grpc.ClientUnaryCall;
    public updatePushNotification(request: notifications_pb.NotificationData, callback: (error: grpc.ServiceError | null, response: notifications_pb.Response) => void): grpc.ClientUnaryCall;
    public updatePushNotification(request: notifications_pb.NotificationData, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: notifications_pb.Response) => void): grpc.ClientUnaryCall;
    public updatePushNotification(request: notifications_pb.NotificationData, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: notifications_pb.Response) => void): grpc.ClientUnaryCall;
}
