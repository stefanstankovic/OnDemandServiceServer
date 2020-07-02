// package: notifications
// file: notifications.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as notifications_pb from "./notifications_pb";

interface INotificationsService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    sendEmail: INotificationsService_ISendEmail;
    getEmailsForEmailAddress: INotificationsService_IGetEmailsForEmailAddress;
    findEmailsForEmailByContent: INotificationsService_IFindEmailsForEmailByContent;
    sendPushNotification: INotificationsService_ISendPushNotification;
    getPushNotificationsForUser: INotificationsService_IGetPushNotificationsForUser;
    findPushNotificationsForUser: INotificationsService_IFindPushNotificationsForUser;
    getUndeliveredNotificationsForUser: INotificationsService_IGetUndeliveredNotificationsForUser;
    updatePushNotification: INotificationsService_IUpdatePushNotification;
}

interface INotificationsService_ISendEmail extends grpc.MethodDefinition<notifications_pb.EmailData, notifications_pb.Response> {
    path: string; // "/notifications.Notifications/SendEmail"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<notifications_pb.EmailData>;
    requestDeserialize: grpc.deserialize<notifications_pb.EmailData>;
    responseSerialize: grpc.serialize<notifications_pb.Response>;
    responseDeserialize: grpc.deserialize<notifications_pb.Response>;
}
interface INotificationsService_IGetEmailsForEmailAddress extends grpc.MethodDefinition<notifications_pb.EmailAddress, notifications_pb.Emails> {
    path: string; // "/notifications.Notifications/GetEmailsForEmailAddress"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<notifications_pb.EmailAddress>;
    requestDeserialize: grpc.deserialize<notifications_pb.EmailAddress>;
    responseSerialize: grpc.serialize<notifications_pb.Emails>;
    responseDeserialize: grpc.deserialize<notifications_pb.Emails>;
}
interface INotificationsService_IFindEmailsForEmailByContent extends grpc.MethodDefinition<notifications_pb.Query, notifications_pb.Emails> {
    path: string; // "/notifications.Notifications/FindEmailsForEmailByContent"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<notifications_pb.Query>;
    requestDeserialize: grpc.deserialize<notifications_pb.Query>;
    responseSerialize: grpc.serialize<notifications_pb.Emails>;
    responseDeserialize: grpc.deserialize<notifications_pb.Emails>;
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
    sendEmail: grpc.handleUnaryCall<notifications_pb.EmailData, notifications_pb.Response>;
    getEmailsForEmailAddress: grpc.handleUnaryCall<notifications_pb.EmailAddress, notifications_pb.Emails>;
    findEmailsForEmailByContent: grpc.handleUnaryCall<notifications_pb.Query, notifications_pb.Emails>;
    sendPushNotification: grpc.handleUnaryCall<notifications_pb.NotificationData, notifications_pb.Response>;
    getPushNotificationsForUser: grpc.handleUnaryCall<notifications_pb.UserId, notifications_pb.PushNotifications>;
    findPushNotificationsForUser: grpc.handleUnaryCall<notifications_pb.Query, notifications_pb.PushNotifications>;
    getUndeliveredNotificationsForUser: grpc.handleUnaryCall<notifications_pb.UserId, notifications_pb.PushNotifications>;
    updatePushNotification: grpc.handleUnaryCall<notifications_pb.NotificationData, notifications_pb.Response>;
}

export interface INotificationsClient {
    sendEmail(request: notifications_pb.EmailData, callback: (error: grpc.ServiceError | null, response: notifications_pb.Response) => void): grpc.ClientUnaryCall;
    sendEmail(request: notifications_pb.EmailData, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: notifications_pb.Response) => void): grpc.ClientUnaryCall;
    sendEmail(request: notifications_pb.EmailData, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: notifications_pb.Response) => void): grpc.ClientUnaryCall;
    getEmailsForEmailAddress(request: notifications_pb.EmailAddress, callback: (error: grpc.ServiceError | null, response: notifications_pb.Emails) => void): grpc.ClientUnaryCall;
    getEmailsForEmailAddress(request: notifications_pb.EmailAddress, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: notifications_pb.Emails) => void): grpc.ClientUnaryCall;
    getEmailsForEmailAddress(request: notifications_pb.EmailAddress, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: notifications_pb.Emails) => void): grpc.ClientUnaryCall;
    findEmailsForEmailByContent(request: notifications_pb.Query, callback: (error: grpc.ServiceError | null, response: notifications_pb.Emails) => void): grpc.ClientUnaryCall;
    findEmailsForEmailByContent(request: notifications_pb.Query, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: notifications_pb.Emails) => void): grpc.ClientUnaryCall;
    findEmailsForEmailByContent(request: notifications_pb.Query, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: notifications_pb.Emails) => void): grpc.ClientUnaryCall;
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
    public sendEmail(request: notifications_pb.EmailData, callback: (error: grpc.ServiceError | null, response: notifications_pb.Response) => void): grpc.ClientUnaryCall;
    public sendEmail(request: notifications_pb.EmailData, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: notifications_pb.Response) => void): grpc.ClientUnaryCall;
    public sendEmail(request: notifications_pb.EmailData, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: notifications_pb.Response) => void): grpc.ClientUnaryCall;
    public getEmailsForEmailAddress(request: notifications_pb.EmailAddress, callback: (error: grpc.ServiceError | null, response: notifications_pb.Emails) => void): grpc.ClientUnaryCall;
    public getEmailsForEmailAddress(request: notifications_pb.EmailAddress, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: notifications_pb.Emails) => void): grpc.ClientUnaryCall;
    public getEmailsForEmailAddress(request: notifications_pb.EmailAddress, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: notifications_pb.Emails) => void): grpc.ClientUnaryCall;
    public findEmailsForEmailByContent(request: notifications_pb.Query, callback: (error: grpc.ServiceError | null, response: notifications_pb.Emails) => void): grpc.ClientUnaryCall;
    public findEmailsForEmailByContent(request: notifications_pb.Query, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: notifications_pb.Emails) => void): grpc.ClientUnaryCall;
    public findEmailsForEmailByContent(request: notifications_pb.Query, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: notifications_pb.Emails) => void): grpc.ClientUnaryCall;
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
