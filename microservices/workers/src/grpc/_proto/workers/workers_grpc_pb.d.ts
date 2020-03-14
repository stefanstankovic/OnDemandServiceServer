// package: workers
// file: workers.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as workers_pb from "./workers_pb";

interface IWorkersService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    addWorker: IWorkersService_IAddWorker;
    removeWorker: IWorkersService_IRemoveWorker;
    getWorkers: IWorkersService_IGetWorkers;
    freeWorkersInRadius: IWorkersService_IFreeWorkersInRadius;
    updateWorkerStatus: IWorkersService_IUpdateWorkerStatus;
    updateWorkerLocation: IWorkersService_IUpdateWorkerLocation;
    getWorkerLocation: IWorkersService_IGetWorkerLocation;
}

interface IWorkersService_IAddWorker extends grpc.MethodDefinition<workers_pb.WorkerData, workers_pb.Response> {
    path: string; // "/workers.Workers/AddWorker"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<workers_pb.WorkerData>;
    requestDeserialize: grpc.deserialize<workers_pb.WorkerData>;
    responseSerialize: grpc.serialize<workers_pb.Response>;
    responseDeserialize: grpc.deserialize<workers_pb.Response>;
}
interface IWorkersService_IRemoveWorker extends grpc.MethodDefinition<workers_pb.WorkerId, workers_pb.Response> {
    path: string; // "/workers.Workers/RemoveWorker"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<workers_pb.WorkerId>;
    requestDeserialize: grpc.deserialize<workers_pb.WorkerId>;
    responseSerialize: grpc.serialize<workers_pb.Response>;
    responseDeserialize: grpc.deserialize<workers_pb.Response>;
}
interface IWorkersService_IGetWorkers extends grpc.MethodDefinition<workers_pb.WorkerStatus, workers_pb.WorkersResponse> {
    path: string; // "/workers.Workers/GetWorkers"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<workers_pb.WorkerStatus>;
    requestDeserialize: grpc.deserialize<workers_pb.WorkerStatus>;
    responseSerialize: grpc.serialize<workers_pb.WorkersResponse>;
    responseDeserialize: grpc.deserialize<workers_pb.WorkersResponse>;
}
interface IWorkersService_IFreeWorkersInRadius extends grpc.MethodDefinition<workers_pb.Radius, workers_pb.WorkersResponse> {
    path: string; // "/workers.Workers/FreeWorkersInRadius"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<workers_pb.Radius>;
    requestDeserialize: grpc.deserialize<workers_pb.Radius>;
    responseSerialize: grpc.serialize<workers_pb.WorkersResponse>;
    responseDeserialize: grpc.deserialize<workers_pb.WorkersResponse>;
}
interface IWorkersService_IUpdateWorkerStatus extends grpc.MethodDefinition<workers_pb.Status, workers_pb.Response> {
    path: string; // "/workers.Workers/UpdateWorkerStatus"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<workers_pb.Status>;
    requestDeserialize: grpc.deserialize<workers_pb.Status>;
    responseSerialize: grpc.serialize<workers_pb.Response>;
    responseDeserialize: grpc.deserialize<workers_pb.Response>;
}
interface IWorkersService_IUpdateWorkerLocation extends grpc.MethodDefinition<workers_pb.Location, workers_pb.Response> {
    path: string; // "/workers.Workers/UpdateWorkerLocation"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<workers_pb.Location>;
    requestDeserialize: grpc.deserialize<workers_pb.Location>;
    responseSerialize: grpc.serialize<workers_pb.Response>;
    responseDeserialize: grpc.deserialize<workers_pb.Response>;
}
interface IWorkersService_IGetWorkerLocation extends grpc.MethodDefinition<workers_pb.WorkerId, workers_pb.LocationResult> {
    path: string; // "/workers.Workers/GetWorkerLocation"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<workers_pb.WorkerId>;
    requestDeserialize: grpc.deserialize<workers_pb.WorkerId>;
    responseSerialize: grpc.serialize<workers_pb.LocationResult>;
    responseDeserialize: grpc.deserialize<workers_pb.LocationResult>;
}

export const WorkersService: IWorkersService;

export interface IWorkersServer {
    addWorker: grpc.handleUnaryCall<workers_pb.WorkerData, workers_pb.Response>;
    removeWorker: grpc.handleUnaryCall<workers_pb.WorkerId, workers_pb.Response>;
    getWorkers: grpc.handleUnaryCall<workers_pb.WorkerStatus, workers_pb.WorkersResponse>;
    freeWorkersInRadius: grpc.handleUnaryCall<workers_pb.Radius, workers_pb.WorkersResponse>;
    updateWorkerStatus: grpc.handleUnaryCall<workers_pb.Status, workers_pb.Response>;
    updateWorkerLocation: grpc.handleUnaryCall<workers_pb.Location, workers_pb.Response>;
    getWorkerLocation: grpc.handleUnaryCall<workers_pb.WorkerId, workers_pb.LocationResult>;
}

export interface IWorkersClient {
    addWorker(request: workers_pb.WorkerData, callback: (error: grpc.ServiceError | null, response: workers_pb.Response) => void): grpc.ClientUnaryCall;
    addWorker(request: workers_pb.WorkerData, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: workers_pb.Response) => void): grpc.ClientUnaryCall;
    addWorker(request: workers_pb.WorkerData, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: workers_pb.Response) => void): grpc.ClientUnaryCall;
    removeWorker(request: workers_pb.WorkerId, callback: (error: grpc.ServiceError | null, response: workers_pb.Response) => void): grpc.ClientUnaryCall;
    removeWorker(request: workers_pb.WorkerId, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: workers_pb.Response) => void): grpc.ClientUnaryCall;
    removeWorker(request: workers_pb.WorkerId, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: workers_pb.Response) => void): grpc.ClientUnaryCall;
    getWorkers(request: workers_pb.WorkerStatus, callback: (error: grpc.ServiceError | null, response: workers_pb.WorkersResponse) => void): grpc.ClientUnaryCall;
    getWorkers(request: workers_pb.WorkerStatus, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: workers_pb.WorkersResponse) => void): grpc.ClientUnaryCall;
    getWorkers(request: workers_pb.WorkerStatus, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: workers_pb.WorkersResponse) => void): grpc.ClientUnaryCall;
    freeWorkersInRadius(request: workers_pb.Radius, callback: (error: grpc.ServiceError | null, response: workers_pb.WorkersResponse) => void): grpc.ClientUnaryCall;
    freeWorkersInRadius(request: workers_pb.Radius, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: workers_pb.WorkersResponse) => void): grpc.ClientUnaryCall;
    freeWorkersInRadius(request: workers_pb.Radius, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: workers_pb.WorkersResponse) => void): grpc.ClientUnaryCall;
    updateWorkerStatus(request: workers_pb.Status, callback: (error: grpc.ServiceError | null, response: workers_pb.Response) => void): grpc.ClientUnaryCall;
    updateWorkerStatus(request: workers_pb.Status, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: workers_pb.Response) => void): grpc.ClientUnaryCall;
    updateWorkerStatus(request: workers_pb.Status, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: workers_pb.Response) => void): grpc.ClientUnaryCall;
    updateWorkerLocation(request: workers_pb.Location, callback: (error: grpc.ServiceError | null, response: workers_pb.Response) => void): grpc.ClientUnaryCall;
    updateWorkerLocation(request: workers_pb.Location, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: workers_pb.Response) => void): grpc.ClientUnaryCall;
    updateWorkerLocation(request: workers_pb.Location, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: workers_pb.Response) => void): grpc.ClientUnaryCall;
    getWorkerLocation(request: workers_pb.WorkerId, callback: (error: grpc.ServiceError | null, response: workers_pb.LocationResult) => void): grpc.ClientUnaryCall;
    getWorkerLocation(request: workers_pb.WorkerId, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: workers_pb.LocationResult) => void): grpc.ClientUnaryCall;
    getWorkerLocation(request: workers_pb.WorkerId, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: workers_pb.LocationResult) => void): grpc.ClientUnaryCall;
}

export class WorkersClient extends grpc.Client implements IWorkersClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public addWorker(request: workers_pb.WorkerData, callback: (error: grpc.ServiceError | null, response: workers_pb.Response) => void): grpc.ClientUnaryCall;
    public addWorker(request: workers_pb.WorkerData, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: workers_pb.Response) => void): grpc.ClientUnaryCall;
    public addWorker(request: workers_pb.WorkerData, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: workers_pb.Response) => void): grpc.ClientUnaryCall;
    public removeWorker(request: workers_pb.WorkerId, callback: (error: grpc.ServiceError | null, response: workers_pb.Response) => void): grpc.ClientUnaryCall;
    public removeWorker(request: workers_pb.WorkerId, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: workers_pb.Response) => void): grpc.ClientUnaryCall;
    public removeWorker(request: workers_pb.WorkerId, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: workers_pb.Response) => void): grpc.ClientUnaryCall;
    public getWorkers(request: workers_pb.WorkerStatus, callback: (error: grpc.ServiceError | null, response: workers_pb.WorkersResponse) => void): grpc.ClientUnaryCall;
    public getWorkers(request: workers_pb.WorkerStatus, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: workers_pb.WorkersResponse) => void): grpc.ClientUnaryCall;
    public getWorkers(request: workers_pb.WorkerStatus, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: workers_pb.WorkersResponse) => void): grpc.ClientUnaryCall;
    public freeWorkersInRadius(request: workers_pb.Radius, callback: (error: grpc.ServiceError | null, response: workers_pb.WorkersResponse) => void): grpc.ClientUnaryCall;
    public freeWorkersInRadius(request: workers_pb.Radius, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: workers_pb.WorkersResponse) => void): grpc.ClientUnaryCall;
    public freeWorkersInRadius(request: workers_pb.Radius, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: workers_pb.WorkersResponse) => void): grpc.ClientUnaryCall;
    public updateWorkerStatus(request: workers_pb.Status, callback: (error: grpc.ServiceError | null, response: workers_pb.Response) => void): grpc.ClientUnaryCall;
    public updateWorkerStatus(request: workers_pb.Status, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: workers_pb.Response) => void): grpc.ClientUnaryCall;
    public updateWorkerStatus(request: workers_pb.Status, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: workers_pb.Response) => void): grpc.ClientUnaryCall;
    public updateWorkerLocation(request: workers_pb.Location, callback: (error: grpc.ServiceError | null, response: workers_pb.Response) => void): grpc.ClientUnaryCall;
    public updateWorkerLocation(request: workers_pb.Location, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: workers_pb.Response) => void): grpc.ClientUnaryCall;
    public updateWorkerLocation(request: workers_pb.Location, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: workers_pb.Response) => void): grpc.ClientUnaryCall;
    public getWorkerLocation(request: workers_pb.WorkerId, callback: (error: grpc.ServiceError | null, response: workers_pb.LocationResult) => void): grpc.ClientUnaryCall;
    public getWorkerLocation(request: workers_pb.WorkerId, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: workers_pb.LocationResult) => void): grpc.ClientUnaryCall;
    public getWorkerLocation(request: workers_pb.WorkerId, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: workers_pb.LocationResult) => void): grpc.ClientUnaryCall;
}
