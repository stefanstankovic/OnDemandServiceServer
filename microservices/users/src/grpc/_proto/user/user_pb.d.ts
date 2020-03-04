// package: user
// file: user.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class UserData extends jspb.Message { 
    getId(): string;
    setId(value: string): void;

    getEmail(): string;
    setEmail(value: string): void;

    getMobile(): string;
    setMobile(value: string): void;

    getPassword(): string;
    setPassword(value: string): void;

    getRole(): string;
    setRole(value: string): void;

    getAccesstoken(): string;
    setAccesstoken(value: string): void;

    getCreateat(): string;
    setCreateat(value: string): void;

    getUpdateat(): string;
    setUpdateat(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UserData.AsObject;
    static toObject(includeInstance: boolean, msg: UserData): UserData.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UserData, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UserData;
    static deserializeBinaryFromReader(message: UserData, reader: jspb.BinaryReader): UserData;
}

export namespace UserData {
    export type AsObject = {
        id: string,
        email: string,
        mobile: string,
        password: string,
        role: string,
        accesstoken: string,
        createat: string,
        updateat: string,
    }
}

export class UpdateUserRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): void;


    hasData(): boolean;
    clearData(): void;
    getData(): UserData | undefined;
    setData(value?: UserData): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateUserRequest.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateUserRequest): UpdateUserRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateUserRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateUserRequest;
    static deserializeBinaryFromReader(message: UpdateUserRequest, reader: jspb.BinaryReader): UpdateUserRequest;
}

export namespace UpdateUserRequest {
    export type AsObject = {
        id: string,
        data?: UserData.AsObject,
    }
}

export class UserDataResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): void;

    getMessage(): string;
    setMessage(value: string): void;


    hasData(): boolean;
    clearData(): void;
    getData(): UserData | undefined;
    setData(value?: UserData): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UserDataResponse.AsObject;
    static toObject(includeInstance: boolean, msg: UserDataResponse): UserDataResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UserDataResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UserDataResponse;
    static deserializeBinaryFromReader(message: UserDataResponse, reader: jspb.BinaryReader): UserDataResponse;
}

export namespace UserDataResponse {
    export type AsObject = {
        success: boolean,
        message: string,
        data?: UserData.AsObject,
    }
}

export class UserDetails extends jspb.Message { 
    getId(): string;
    setId(value: string): void;

    getFirstname(): string;
    setFirstname(value: string): void;

    getLastname(): string;
    setLastname(value: string): void;

    getBirthday(): string;
    setBirthday(value: string): void;


    hasUser(): boolean;
    clearUser(): void;
    getUser(): UserData | undefined;
    setUser(value?: UserData): void;

    getCreateat(): string;
    setCreateat(value: string): void;

    getUpdateat(): string;
    setUpdateat(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UserDetails.AsObject;
    static toObject(includeInstance: boolean, msg: UserDetails): UserDetails.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UserDetails, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UserDetails;
    static deserializeBinaryFromReader(message: UserDetails, reader: jspb.BinaryReader): UserDetails;
}

export namespace UserDetails {
    export type AsObject = {
        id: string,
        firstname: string,
        lastname: string,
        birthday: string,
        user?: UserData.AsObject,
        createat: string,
        updateat: string,
    }
}

export class UpdateUserDetailsRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): void;


    hasData(): boolean;
    clearData(): void;
    getData(): UserDetails | undefined;
    setData(value?: UserDetails): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateUserDetailsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateUserDetailsRequest): UpdateUserDetailsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateUserDetailsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateUserDetailsRequest;
    static deserializeBinaryFromReader(message: UpdateUserDetailsRequest, reader: jspb.BinaryReader): UpdateUserDetailsRequest;
}

export namespace UpdateUserDetailsRequest {
    export type AsObject = {
        id: string,
        data?: UserDetails.AsObject,
    }
}

export class UserDetailsResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): void;

    getMessage(): string;
    setMessage(value: string): void;


    hasData(): boolean;
    clearData(): void;
    getData(): UserDetails | undefined;
    setData(value?: UserDetails): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UserDetailsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: UserDetailsResponse): UserDetailsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UserDetailsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UserDetailsResponse;
    static deserializeBinaryFromReader(message: UserDetailsResponse, reader: jspb.BinaryReader): UserDetailsResponse;
}

export namespace UserDetailsResponse {
    export type AsObject = {
        success: boolean,
        message: string,
        data?: UserDetails.AsObject,
    }
}

export class Login extends jspb.Message { 
    getEmail(): string;
    setEmail(value: string): void;

    getPassword(): string;
    setPassword(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Login.AsObject;
    static toObject(includeInstance: boolean, msg: Login): Login.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Login, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Login;
    static deserializeBinaryFromReader(message: Login, reader: jspb.BinaryReader): Login;
}

export namespace Login {
    export type AsObject = {
        email: string,
        password: string,
    }
}

export class WorkerOptions extends jspb.Message { 
    getId(): string;
    setId(value: string): void;

    getBusy(): boolean;
    setBusy(value: boolean): void;

    getReadius(): number;
    setReadius(value: number): void;


    hasUser(): boolean;
    clearUser(): void;
    getUser(): UserData | undefined;
    setUser(value?: UserData): void;

    getCreateat(): string;
    setCreateat(value: string): void;

    getUpdateat(): string;
    setUpdateat(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WorkerOptions.AsObject;
    static toObject(includeInstance: boolean, msg: WorkerOptions): WorkerOptions.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WorkerOptions, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WorkerOptions;
    static deserializeBinaryFromReader(message: WorkerOptions, reader: jspb.BinaryReader): WorkerOptions;
}

export namespace WorkerOptions {
    export type AsObject = {
        id: string,
        busy: boolean,
        readius: number,
        user?: UserData.AsObject,
        createat: string,
        updateat: string,
    }
}

export class WorkerOptionsRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): void;


    hasData(): boolean;
    clearData(): void;
    getData(): WorkerOptions | undefined;
    setData(value?: WorkerOptions): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WorkerOptionsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: WorkerOptionsRequest): WorkerOptionsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WorkerOptionsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WorkerOptionsRequest;
    static deserializeBinaryFromReader(message: WorkerOptionsRequest, reader: jspb.BinaryReader): WorkerOptionsRequest;
}

export namespace WorkerOptionsRequest {
    export type AsObject = {
        id: string,
        data?: WorkerOptions.AsObject,
    }
}

export class WorkerOptionsResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): void;

    getMessage(): string;
    setMessage(value: string): void;


    hasData(): boolean;
    clearData(): void;
    getData(): WorkerOptions | undefined;
    setData(value?: WorkerOptions): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WorkerOptionsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: WorkerOptionsResponse): WorkerOptionsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WorkerOptionsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WorkerOptionsResponse;
    static deserializeBinaryFromReader(message: WorkerOptionsResponse, reader: jspb.BinaryReader): WorkerOptionsResponse;
}

export namespace WorkerOptionsResponse {
    export type AsObject = {
        success: boolean,
        message: string,
        data?: WorkerOptions.AsObject,
    }
}

export class Response extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): void;

    getId(): string;
    setId(value: string): void;

    getMessage(): string;
    setMessage(value: string): void;


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
        id: string,
        message: string,
    }
}

export class Id extends jspb.Message { 
    getId(): string;
    setId(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Id.AsObject;
    static toObject(includeInstance: boolean, msg: Id): Id.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Id, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Id;
    static deserializeBinaryFromReader(message: Id, reader: jspb.BinaryReader): Id;
}

export namespace Id {
    export type AsObject = {
        id: string,
    }
}

export class Query extends jspb.Message { 
    getWhere(): string;
    setWhere(value: string): void;

    getOrderby(): string;
    setOrderby(value: string): void;

    getLimit(): number;
    setLimit(value: number): void;

    getBefore(): string;
    setBefore(value: string): void;

    getAfter(): string;
    setAfter(value: string): void;


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
        where: string,
        orderby: string,
        limit: number,
        before: string,
        after: string,
    }
}
