// package: ranks
// file: ranks.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as ranks_pb from "./ranks_pb";

interface IRanksService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    addRank: IRanksService_IAddRank;
    getRanks: IRanksService_IGetRanks;
}

interface IRanksService_IAddRank extends grpc.MethodDefinition<ranks_pb.RankData, ranks_pb.Response> {
    path: string; // "/ranks.Ranks/AddRank"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<ranks_pb.RankData>;
    requestDeserialize: grpc.deserialize<ranks_pb.RankData>;
    responseSerialize: grpc.serialize<ranks_pb.Response>;
    responseDeserialize: grpc.deserialize<ranks_pb.Response>;
}
interface IRanksService_IGetRanks extends grpc.MethodDefinition<ranks_pb.Query, ranks_pb.RanksResponse> {
    path: string; // "/ranks.Ranks/GetRanks"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<ranks_pb.Query>;
    requestDeserialize: grpc.deserialize<ranks_pb.Query>;
    responseSerialize: grpc.serialize<ranks_pb.RanksResponse>;
    responseDeserialize: grpc.deserialize<ranks_pb.RanksResponse>;
}

export const RanksService: IRanksService;

export interface IRanksServer {
    addRank: grpc.handleUnaryCall<ranks_pb.RankData, ranks_pb.Response>;
    getRanks: grpc.handleUnaryCall<ranks_pb.Query, ranks_pb.RanksResponse>;
}

export interface IRanksClient {
    addRank(request: ranks_pb.RankData, callback: (error: grpc.ServiceError | null, response: ranks_pb.Response) => void): grpc.ClientUnaryCall;
    addRank(request: ranks_pb.RankData, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: ranks_pb.Response) => void): grpc.ClientUnaryCall;
    addRank(request: ranks_pb.RankData, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: ranks_pb.Response) => void): grpc.ClientUnaryCall;
    getRanks(request: ranks_pb.Query, callback: (error: grpc.ServiceError | null, response: ranks_pb.RanksResponse) => void): grpc.ClientUnaryCall;
    getRanks(request: ranks_pb.Query, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: ranks_pb.RanksResponse) => void): grpc.ClientUnaryCall;
    getRanks(request: ranks_pb.Query, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: ranks_pb.RanksResponse) => void): grpc.ClientUnaryCall;
}

export class RanksClient extends grpc.Client implements IRanksClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public addRank(request: ranks_pb.RankData, callback: (error: grpc.ServiceError | null, response: ranks_pb.Response) => void): grpc.ClientUnaryCall;
    public addRank(request: ranks_pb.RankData, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: ranks_pb.Response) => void): grpc.ClientUnaryCall;
    public addRank(request: ranks_pb.RankData, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: ranks_pb.Response) => void): grpc.ClientUnaryCall;
    public getRanks(request: ranks_pb.Query, callback: (error: grpc.ServiceError | null, response: ranks_pb.RanksResponse) => void): grpc.ClientUnaryCall;
    public getRanks(request: ranks_pb.Query, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: ranks_pb.RanksResponse) => void): grpc.ClientUnaryCall;
    public getRanks(request: ranks_pb.Query, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: ranks_pb.RanksResponse) => void): grpc.ClientUnaryCall;
}
