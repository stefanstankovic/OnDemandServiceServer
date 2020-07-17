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

    getCreatedat(): string;
    setCreatedat(value: string): void;


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
        createdat: string,
    }
}

export class LocationResult extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): void;

    getMessage(): string;
    setMessage(value: string): void;

    clearLocationList(): void;
    getLocationList(): Array<Location>;
    setLocationList(value: Array<Location>): void;
    addLocation(value?: Location, index?: number): Location;


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
        locationList: Array<Location.AsObject>,
    }
}

export class WorkerData extends jspb.Message { 
    getWorkerid(): string;
    setWorkerid(value: string): void;

    getBusy(): boolean;
    setBusy(value: boolean): void;

    getActive(): boolean;
    setActive(value: boolean): void;

    getArchived(): boolean;
    setArchived(value: boolean): void;

    getEmployerid(): string;
    setEmployerid(value: string): void;


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
        archived: boolean,
        employerid: string,
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

    getArchived(): boolean;
    setArchived(value: boolean): void;


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
        archived: boolean,
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

    getArchived(): boolean;
    setArchived(value: boolean): void;


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
        archived: boolean,
    }
}

export class HireWorkerRequest extends jspb.Message { 
    getWorkerid(): string;
    setWorkerid(value: string): void;

    getEmployerid(): string;
    setEmployerid(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): HireWorkerRequest.AsObject;
    static toObject(includeInstance: boolean, msg: HireWorkerRequest): HireWorkerRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: HireWorkerRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): HireWorkerRequest;
    static deserializeBinaryFromReader(message: HireWorkerRequest, reader: jspb.BinaryReader): HireWorkerRequest;
}

export namespace HireWorkerRequest {
    export type AsObject = {
        workerid: string,
        employerid: string,
    }
}

export class EmployerId extends jspb.Message { 
    getId(): string;
    setId(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EmployerId.AsObject;
    static toObject(includeInstance: boolean, msg: EmployerId): EmployerId.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: EmployerId, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): EmployerId;
    static deserializeBinaryFromReader(message: EmployerId, reader: jspb.BinaryReader): EmployerId;
}

export namespace EmployerId {
    export type AsObject = {
        id: string,
    }
}

export class HiredWorker extends jspb.Message { 

    hasData(): boolean;
    clearData(): void;
    getData(): WorkerData | undefined;
    setData(value?: WorkerData): void;

    clearLocationList(): void;
    getLocationList(): Array<Location>;
    setLocationList(value: Array<Location>): void;
    addLocation(value?: Location, index?: number): Location;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): HiredWorker.AsObject;
    static toObject(includeInstance: boolean, msg: HiredWorker): HiredWorker.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: HiredWorker, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): HiredWorker;
    static deserializeBinaryFromReader(message: HiredWorker, reader: jspb.BinaryReader): HiredWorker;
}

export namespace HiredWorker {
    export type AsObject = {
        data?: WorkerData.AsObject,
        locationList: Array<Location.AsObject>,
    }
}

export class AllWorkersForEmployerResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): void;

    getMessage(): string;
    setMessage(value: string): void;

    getEmployerid(): string;
    setEmployerid(value: string): void;

    clearWorkersList(): void;
    getWorkersList(): Array<HiredWorker>;
    setWorkersList(value: Array<HiredWorker>): void;
    addWorkers(value?: HiredWorker, index?: number): HiredWorker;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AllWorkersForEmployerResponse.AsObject;
    static toObject(includeInstance: boolean, msg: AllWorkersForEmployerResponse): AllWorkersForEmployerResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AllWorkersForEmployerResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AllWorkersForEmployerResponse;
    static deserializeBinaryFromReader(message: AllWorkersForEmployerResponse, reader: jspb.BinaryReader): AllWorkersForEmployerResponse;
}

export namespace AllWorkersForEmployerResponse {
    export type AsObject = {
        success: boolean,
        message: string,
        employerid: string,
        workersList: Array<HiredWorker.AsObject>,
    }
}

export class HireRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): void;

    getWorkerid(): string;
    setWorkerid(value: string): void;

    getEmployerid(): string;
    setEmployerid(value: string): void;

    getStatus(): string;
    setStatus(value: string): void;

    getRequestmessage(): string;
    setRequestmessage(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): HireRequest.AsObject;
    static toObject(includeInstance: boolean, msg: HireRequest): HireRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: HireRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): HireRequest;
    static deserializeBinaryFromReader(message: HireRequest, reader: jspb.BinaryReader): HireRequest;
}

export namespace HireRequest {
    export type AsObject = {
        id: string,
        workerid: string,
        employerid: string,
        status: string,
        requestmessage: string,
    }
}

export class HireRequestQuery extends jspb.Message { 
    getWorkerid(): string;
    setWorkerid(value: string): void;

    getEmployerid(): string;
    setEmployerid(value: string): void;

    getStatus(): string;
    setStatus(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): HireRequestQuery.AsObject;
    static toObject(includeInstance: boolean, msg: HireRequestQuery): HireRequestQuery.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: HireRequestQuery, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): HireRequestQuery;
    static deserializeBinaryFromReader(message: HireRequestQuery, reader: jspb.BinaryReader): HireRequestQuery;
}

export namespace HireRequestQuery {
    export type AsObject = {
        workerid: string,
        employerid: string,
        status: string,
    }
}

export class HireRequestResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): void;

    getMessage(): string;
    setMessage(value: string): void;

    clearRequestsList(): void;
    getRequestsList(): Array<HireRequest>;
    setRequestsList(value: Array<HireRequest>): void;
    addRequests(value?: HireRequest, index?: number): HireRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): HireRequestResponse.AsObject;
    static toObject(includeInstance: boolean, msg: HireRequestResponse): HireRequestResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: HireRequestResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): HireRequestResponse;
    static deserializeBinaryFromReader(message: HireRequestResponse, reader: jspb.BinaryReader): HireRequestResponse;
}

export namespace HireRequestResponse {
    export type AsObject = {
        success: boolean,
        message: string,
        requestsList: Array<HireRequest.AsObject>,
    }
}

export class HireRequestId extends jspb.Message { 
    getId(): string;
    setId(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): HireRequestId.AsObject;
    static toObject(includeInstance: boolean, msg: HireRequestId): HireRequestId.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: HireRequestId, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): HireRequestId;
    static deserializeBinaryFromReader(message: HireRequestId, reader: jspb.BinaryReader): HireRequestId;
}

export namespace HireRequestId {
    export type AsObject = {
        id: string,
    }
}
