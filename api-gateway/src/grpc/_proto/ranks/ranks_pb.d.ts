// package: ranks
// file: ranks.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class RankData extends jspb.Message { 
    getUserid(): string;
    setUserid(value: string): void;

    getRankedbyid(): string;
    setRankedbyid(value: string): void;

    getType(): string;
    setType(value: string): void;

    getStars(): number;
    setStars(value: number): void;

    getComment(): string;
    setComment(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RankData.AsObject;
    static toObject(includeInstance: boolean, msg: RankData): RankData.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RankData, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RankData;
    static deserializeBinaryFromReader(message: RankData, reader: jspb.BinaryReader): RankData;
}

export namespace RankData {
    export type AsObject = {
        userid: string,
        rankedbyid: string,
        type: string,
        stars: number,
        comment: string,
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

export class Query extends jspb.Message { 
    getUserid(): string;
    setUserid(value: string): void;

    getRangerid(): string;
    setRangerid(value: string): void;

    getType(): string;
    setType(value: string): void;

    getStars(): number;
    setStars(value: number): void;

    getCommentpattren(): string;
    setCommentpattren(value: string): void;

    getSkip(): number;
    setSkip(value: number): void;

    getTake(): number;
    setTake(value: number): void;


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
        rangerid: string,
        type: string,
        stars: number,
        commentpattren: string,
        skip: number,
        take: number,
    }
}

export class RanksResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): void;

    getMessage(): string;
    setMessage(value: string): void;

    clearRanksList(): void;
    getRanksList(): Array<RankData>;
    setRanksList(value: Array<RankData>): void;
    addRanks(value?: RankData, index?: number): RankData;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RanksResponse.AsObject;
    static toObject(includeInstance: boolean, msg: RanksResponse): RanksResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RanksResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RanksResponse;
    static deserializeBinaryFromReader(message: RanksResponse, reader: jspb.BinaryReader): RanksResponse;
}

export namespace RanksResponse {
    export type AsObject = {
        success: boolean,
        message: string,
        ranksList: Array<RankData.AsObject>,
    }
}
