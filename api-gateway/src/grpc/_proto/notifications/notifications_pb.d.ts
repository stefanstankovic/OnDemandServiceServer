// package: notifications
// file: notifications.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class NotificationData extends jspb.Message { 
    getId(): string;
    setId(value: string): void;

    getUserid(): string;
    setUserid(value: string): void;

    getType(): string;
    setType(value: string): void;

    getMessagedata(): string;
    setMessagedata(value: string): void;

    getDelivered(): boolean;
    setDelivered(value: boolean): void;

    getOpened(): boolean;
    setOpened(value: boolean): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): NotificationData.AsObject;
    static toObject(includeInstance: boolean, msg: NotificationData): NotificationData.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: NotificationData, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): NotificationData;
    static deserializeBinaryFromReader(message: NotificationData, reader: jspb.BinaryReader): NotificationData;
}

export namespace NotificationData {
    export type AsObject = {
        id: string,
        userid: string,
        type: string,
        messagedata: string,
        delivered: boolean,
        opened: boolean,
    }
}

export class Response extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): void;

    getMessage(): string;
    setMessage(value: string): void;

    getId(): string;
    setId(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Response.AsObject;
    static toObject(includeInstance: boolean, msg: Response): Response.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Response, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Response;
    static deserializeBinaryFromReader(message: Response, reader: jspb.BinaryReader): Response;
}

export namespace Response {
    export type AsObject = {
        success: boolean,
        message: string,
        id: string,
    }
}

export class UserId extends jspb.Message { 
    getId(): string;
    setId(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UserId.AsObject;
    static toObject(includeInstance: boolean, msg: UserId): UserId.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UserId, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UserId;
    static deserializeBinaryFromReader(message: UserId, reader: jspb.BinaryReader): UserId;
}

export namespace UserId {
    export type AsObject = {
        id: string,
    }
}

export class PushNotifications extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): void;

    getMessage(): string;
    setMessage(value: string): void;

    clearNotificationsList(): void;
    getNotificationsList(): Array<NotificationData>;
    setNotificationsList(value: Array<NotificationData>): void;
    addNotifications(value?: NotificationData, index?: number): NotificationData;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PushNotifications.AsObject;
    static toObject(includeInstance: boolean, msg: PushNotifications): PushNotifications.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PushNotifications, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PushNotifications;
    static deserializeBinaryFromReader(message: PushNotifications, reader: jspb.BinaryReader): PushNotifications;
}

export namespace PushNotifications {
    export type AsObject = {
        success: boolean,
        message: string,
        notificationsList: Array<NotificationData.AsObject>,
    }
}

export class Query extends jspb.Message { 
    getUserid(): string;
    setUserid(value: string): void;

    getEmail(): string;
    setEmail(value: string): void;

    getDelivered(): boolean;
    setDelivered(value: boolean): void;

    getOpened(): boolean;
    setOpened(value: boolean): void;

    getPartiallycontenten(): string;
    setPartiallycontenten(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Query.AsObject;
    static toObject(includeInstance: boolean, msg: Query): Query.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Query, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Query;
    static deserializeBinaryFromReader(message: Query, reader: jspb.BinaryReader): Query;
}

export namespace Query {
    export type AsObject = {
        userid: string,
        email: string,
        delivered: boolean,
        opened: boolean,
        partiallycontenten: string,
    }
}

export class NotificationId extends jspb.Message { 
    getId(): string;
    setId(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): NotificationId.AsObject;
    static toObject(includeInstance: boolean, msg: NotificationId): NotificationId.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: NotificationId, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): NotificationId;
    static deserializeBinaryFromReader(message: NotificationId, reader: jspb.BinaryReader): NotificationId;
}

export namespace NotificationId {
    export type AsObject = {
        id: string,
    }
}

export class UserDeviceData extends jspb.Message { 
    getId(): string;
    setId(value: string): void;

    getUserid(): string;
    setUserid(value: string): void;

    getUserdevice(): string;
    setUserdevice(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UserDeviceData.AsObject;
    static toObject(includeInstance: boolean, msg: UserDeviceData): UserDeviceData.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UserDeviceData, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UserDeviceData;
    static deserializeBinaryFromReader(message: UserDeviceData, reader: jspb.BinaryReader): UserDeviceData;
}

export namespace UserDeviceData {
    export type AsObject = {
        id: string,
        userid: string,
        userdevice: string,
    }
}

export class UserDevicesData extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): void;

    getMessage(): string;
    setMessage(value: string): void;

    clearDevicesList(): void;
    getDevicesList(): Array<UserDeviceData>;
    setDevicesList(value: Array<UserDeviceData>): void;
    addDevices(value?: UserDeviceData, index?: number): UserDeviceData;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UserDevicesData.AsObject;
    static toObject(includeInstance: boolean, msg: UserDevicesData): UserDevicesData.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UserDevicesData, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UserDevicesData;
    static deserializeBinaryFromReader(message: UserDevicesData, reader: jspb.BinaryReader): UserDevicesData;
}

export namespace UserDevicesData {
    export type AsObject = {
        success: boolean,
        message: string,
        devicesList: Array<UserDeviceData.AsObject>,
    }
}

export class DeviceId extends jspb.Message { 
    getId(): string;
    setId(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeviceId.AsObject;
    static toObject(includeInstance: boolean, msg: DeviceId): DeviceId.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeviceId, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeviceId;
    static deserializeBinaryFromReader(message: DeviceId, reader: jspb.BinaryReader): DeviceId;
}

export namespace DeviceId {
    export type AsObject = {
        id: string,
    }
}

export class NotificationDataResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): void;

    getMessage(): string;
    setMessage(value: string): void;


    hasData(): boolean;
    clearData(): void;
    getData(): NotificationData | undefined;
    setData(value?: NotificationData): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): NotificationDataResponse.AsObject;
    static toObject(includeInstance: boolean, msg: NotificationDataResponse): NotificationDataResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: NotificationDataResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): NotificationDataResponse;
    static deserializeBinaryFromReader(message: NotificationDataResponse, reader: jspb.BinaryReader): NotificationDataResponse;
}

export namespace NotificationDataResponse {
    export type AsObject = {
        success: boolean,
        message: string,
        data?: NotificationData.AsObject,
    }
}
