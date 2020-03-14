// package: workers
// file: workers.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

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

export class Location extends jspb.Message { 
    getWorkerid(): string;
    setWorkerid(value: string): void;

    getLatitude(): string;
    setLatitude(value: string): void;

    getLongitude(): string;
    setLongitude(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Location.AsObject;
    static toObject(includeInstance: boolean, msg: Location): Location.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Location, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Location;
    static deserializeBinaryFromReader(message: Location, reader: jspb.BinaryReader): Location;
}

export namespace Location {
    export type AsObject = {
        workerid: string,
        latitude: string,
        longitude: string,
    }
}

export class LocationResult extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): void;

    getMessage(): string;
    setMessage(value: string): void;


    hasLocation(): boolean;
    clearLocation(): void;
    getLocation(): Location | undefined;
    setLocation(value?: Location): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LocationResult.AsObject;
    static toObject(includeInstance: boolean, msg: LocationResult): LocationResult.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LocationResult, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LocationResult;
    static deserializeBinaryFromReader(message: LocationResult, reader: jspb.BinaryReader): LocationResult;
}

export namespace LocationResult {
    export type AsObject = {
        success: boolean,
        message: string,
        location?: Location.AsObject,
    }
}

export class WorkerData extends jspb.Message { 
    getWorkerid(): string;
    setWorkerid(value: string): void;

    getBusy(): boolean;
    setBusy(value: boolean): void;

    getActive(): boolean;
    setActive(value: boolean): void;


    hasLocation(): boolean;
    clearLocation(): void;
    getLocation(): Location | undefined;
    setLocation(value?: Location): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WorkerData.AsObject;
    static toObject(includeInstance: boolean, msg: WorkerData): WorkerData.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WorkerData, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WorkerData;
    static deserializeBinaryFromReader(message: WorkerData, reader: jspb.BinaryReader): WorkerData;
}

export namespace WorkerData {
    export type AsObject = {
        workerid: string,
        busy: boolean,
        active: boolean,
        location?: Location.AsObject,
    }
}

export class WorkerId extends jspb.Message { 
    getWorkerid(): string;
    setWorkerid(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WorkerId.AsObject;
    static toObject(includeInstance: boolean, msg: WorkerId): WorkerId.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WorkerId, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WorkerId;
    static deserializeBinaryFromReader(message: WorkerId, reader: jspb.BinaryReader): WorkerId;
}

export namespace WorkerId {
    export type AsObject = {
        workerid: string,
    }
}

export class Paging extends jspb.Message { 
    getOrderby(): string;
    setOrderby(value: string): void;

    getSkip(): number;
    setSkip(value: number): void;

    getTake(): number;
    setTake(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Paging.AsObject;
    static toObject(includeInstance: boolean, msg: Paging): Paging.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Paging, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Paging;
    static deserializeBinaryFromReader(message: Paging, reader: jspb.BinaryReader): Paging;
}

export namespace Paging {
    export type AsObject = {
        orderby: string,
        skip: number,
        take: number,
    }
}

export class WorkersResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): void;

    getMessage(): string;
    setMessage(value: string): void;

    clearWorkersList(): void;
    getWorkersList(): Array<WorkerData>;
    setWorkersList(value: Array<WorkerData>): void;
    addWorkers(value?: WorkerData, index?: number): WorkerData;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WorkersResponse.AsObject;
    static toObject(includeInstance: boolean, msg: WorkersResponse): WorkersResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WorkersResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WorkersResponse;
    static deserializeBinaryFromReader(message: WorkersResponse, reader: jspb.BinaryReader): WorkersResponse;
}

export namespace WorkersResponse {
    export type AsObject = {
        success: boolean,
        message: string,
        workersList: Array<WorkerData.AsObject>,
    }
}

export class WorkerStatus extends jspb.Message { 
    getActive(): boolean;
    setActive(value: boolean): void;

    getBusy(): boolean;
    setBusy(value: boolean): void;


    hasPaging(): boolean;
    clearPaging(): void;
    getPaging(): Paging | undefined;
    setPaging(value?: Paging): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WorkerStatus.AsObject;
    static toObject(includeInstance: boolean, msg: WorkerStatus): WorkerStatus.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WorkerStatus, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WorkerStatus;
    static deserializeBinaryFromReader(message: WorkerStatus, reader: jspb.BinaryReader): WorkerStatus;
}

export namespace WorkerStatus {
    export type AsObject = {
        active: boolean,
        busy: boolean,
        paging?: Paging.AsObject,
    }
}

export class Radius extends jspb.Message { 
    getRadius(): number;
    setRadius(value: number): void;


    hasLocation(): boolean;
    clearLocation(): void;
    getLocation(): Location | undefined;
    setLocation(value?: Location): void;


    hasPaging(): boolean;
    clearPaging(): void;
    getPaging(): Paging | undefined;
    setPaging(value?: Paging): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Radius.AsObject;
    static toObject(includeInstance: boolean, msg: Radius): Radius.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Radius, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Radius;
    static deserializeBinaryFromReader(message: Radius, reader: jspb.BinaryReader): Radius;
}

export namespace Radius {
    export type AsObject = {
        radius: number,
        location?: Location.AsObject,
        paging?: Paging.AsObject,
    }
}

export class Status extends jspb.Message { 
    getWorkerid(): string;
    setWorkerid(value: string): void;

    getActive(): boolean;
    setActive(value: boolean): void;

    getBusy(): boolean;
    setBusy(value: boolean): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Status.AsObject;
    static toObject(includeInstance: boolean, msg: Status): Status.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Status, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Status;
    static deserializeBinaryFromReader(message: Status, reader: jspb.BinaryReader): Status;
}

export namespace Status {
    export type AsObject = {
        workerid: string,
        active: boolean,
        busy: boolean,
    }
}
