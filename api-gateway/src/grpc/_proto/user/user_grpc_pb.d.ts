// package: user
// file: user.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as user_pb from "./user_pb";

interface IUserService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    addUser: IUserService_IAddUser;
    updateUser: IUserService_IUpdateUser;
    findUserById: IUserService_IFindUserById;
    findUser: IUserService_IFindUser;
    addUserDetails: IUserService_IAddUserDetails;
    updateUserDetails: IUserService_IUpdateUserDetails;
    findUserDetailsByUserId: IUserService_IFindUserDetailsByUserId;
    addWorkerOptions: IUserService_IAddWorkerOptions;
    updateWorkerOptions: IUserService_IUpdateWorkerOptions;
    findWorkerOptionsByUserId: IUserService_IFindWorkerOptionsByUserId;
    validateLogin: IUserService_IValidateLogin;
}

interface IUserService_IAddUser extends grpc.MethodDefinition<user_pb.UserData, user_pb.Response> {
    path: string; // "/user.User/AddUser"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<user_pb.UserData>;
    requestDeserialize: grpc.deserialize<user_pb.UserData>;
    responseSerialize: grpc.serialize<user_pb.Response>;
    responseDeserialize: grpc.deserialize<user_pb.Response>;
}
interface IUserService_IUpdateUser extends grpc.MethodDefinition<user_pb.UpdateUserRequest, user_pb.UserDataResponse> {
    path: string; // "/user.User/UpdateUser"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<user_pb.UpdateUserRequest>;
    requestDeserialize: grpc.deserialize<user_pb.UpdateUserRequest>;
    responseSerialize: grpc.serialize<user_pb.UserDataResponse>;
    responseDeserialize: grpc.deserialize<user_pb.UserDataResponse>;
}
interface IUserService_IFindUserById extends grpc.MethodDefinition<user_pb.Id, user_pb.UserDataResponse> {
    path: string; // "/user.User/FindUserById"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<user_pb.Id>;
    requestDeserialize: grpc.deserialize<user_pb.Id>;
    responseSerialize: grpc.serialize<user_pb.UserDataResponse>;
    responseDeserialize: grpc.deserialize<user_pb.UserDataResponse>;
}
interface IUserService_IFindUser extends grpc.MethodDefinition<user_pb.Query, user_pb.UserDataResponse> {
    path: string; // "/user.User/FindUser"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<user_pb.Query>;
    requestDeserialize: grpc.deserialize<user_pb.Query>;
    responseSerialize: grpc.serialize<user_pb.UserDataResponse>;
    responseDeserialize: grpc.deserialize<user_pb.UserDataResponse>;
}
interface IUserService_IAddUserDetails extends grpc.MethodDefinition<user_pb.UserDetails, user_pb.Response> {
    path: string; // "/user.User/AddUserDetails"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<user_pb.UserDetails>;
    requestDeserialize: grpc.deserialize<user_pb.UserDetails>;
    responseSerialize: grpc.serialize<user_pb.Response>;
    responseDeserialize: grpc.deserialize<user_pb.Response>;
}
interface IUserService_IUpdateUserDetails extends grpc.MethodDefinition<user_pb.UpdateUserDetailsRequest, user_pb.UserDetailsResponse> {
    path: string; // "/user.User/UpdateUserDetails"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<user_pb.UpdateUserDetailsRequest>;
    requestDeserialize: grpc.deserialize<user_pb.UpdateUserDetailsRequest>;
    responseSerialize: grpc.serialize<user_pb.UserDetailsResponse>;
    responseDeserialize: grpc.deserialize<user_pb.UserDetailsResponse>;
}
interface IUserService_IFindUserDetailsByUserId extends grpc.MethodDefinition<user_pb.Id, user_pb.UserDetailsResponse> {
    path: string; // "/user.User/FindUserDetailsByUserId"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<user_pb.Id>;
    requestDeserialize: grpc.deserialize<user_pb.Id>;
    responseSerialize: grpc.serialize<user_pb.UserDetailsResponse>;
    responseDeserialize: grpc.deserialize<user_pb.UserDetailsResponse>;
}
interface IUserService_IAddWorkerOptions extends grpc.MethodDefinition<user_pb.WorkerOptions, user_pb.Response> {
    path: string; // "/user.User/AddWorkerOptions"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<user_pb.WorkerOptions>;
    requestDeserialize: grpc.deserialize<user_pb.WorkerOptions>;
    responseSerialize: grpc.serialize<user_pb.Response>;
    responseDeserialize: grpc.deserialize<user_pb.Response>;
}
interface IUserService_IUpdateWorkerOptions extends grpc.MethodDefinition<user_pb.WorkerOptionsRequest, user_pb.WorkerOptionsResponse> {
    path: string; // "/user.User/UpdateWorkerOptions"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<user_pb.WorkerOptionsRequest>;
    requestDeserialize: grpc.deserialize<user_pb.WorkerOptionsRequest>;
    responseSerialize: grpc.serialize<user_pb.WorkerOptionsResponse>;
    responseDeserialize: grpc.deserialize<user_pb.WorkerOptionsResponse>;
}
interface IUserService_IFindWorkerOptionsByUserId extends grpc.MethodDefinition<user_pb.Id, user_pb.WorkerOptionsResponse> {
    path: string; // "/user.User/FindWorkerOptionsByUserId"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<user_pb.Id>;
    requestDeserialize: grpc.deserialize<user_pb.Id>;
    responseSerialize: grpc.serialize<user_pb.WorkerOptionsResponse>;
    responseDeserialize: grpc.deserialize<user_pb.WorkerOptionsResponse>;
}
interface IUserService_IValidateLogin extends grpc.MethodDefinition<user_pb.Login, user_pb.UserDataResponse> {
    path: string; // "/user.User/ValidateLogin"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<user_pb.Login>;
    requestDeserialize: grpc.deserialize<user_pb.Login>;
    responseSerialize: grpc.serialize<user_pb.UserDataResponse>;
    responseDeserialize: grpc.deserialize<user_pb.UserDataResponse>;
}

export const UserService: IUserService;

export interface IUserServer {
    addUser: grpc.handleUnaryCall<user_pb.UserData, user_pb.Response>;
    updateUser: grpc.handleUnaryCall<user_pb.UpdateUserRequest, user_pb.UserDataResponse>;
    findUserById: grpc.handleUnaryCall<user_pb.Id, user_pb.UserDataResponse>;
    findUser: grpc.handleUnaryCall<user_pb.Query, user_pb.UserDataResponse>;
    addUserDetails: grpc.handleUnaryCall<user_pb.UserDetails, user_pb.Response>;
    updateUserDetails: grpc.handleUnaryCall<user_pb.UpdateUserDetailsRequest, user_pb.UserDetailsResponse>;
    findUserDetailsByUserId: grpc.handleUnaryCall<user_pb.Id, user_pb.UserDetailsResponse>;
    addWorkerOptions: grpc.handleUnaryCall<user_pb.WorkerOptions, user_pb.Response>;
    updateWorkerOptions: grpc.handleUnaryCall<user_pb.WorkerOptionsRequest, user_pb.WorkerOptionsResponse>;
    findWorkerOptionsByUserId: grpc.handleUnaryCall<user_pb.Id, user_pb.WorkerOptionsResponse>;
    validateLogin: grpc.handleUnaryCall<user_pb.Login, user_pb.UserDataResponse>;
}

export interface IUserClient {
    addUser(request: user_pb.UserData, callback: (error: grpc.ServiceError | null, response: user_pb.Response) => void): grpc.ClientUnaryCall;
    addUser(request: user_pb.UserData, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.Response) => void): grpc.ClientUnaryCall;
    addUser(request: user_pb.UserData, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.Response) => void): grpc.ClientUnaryCall;
    updateUser(request: user_pb.UpdateUserRequest, callback: (error: grpc.ServiceError | null, response: user_pb.UserDataResponse) => void): grpc.ClientUnaryCall;
    updateUser(request: user_pb.UpdateUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.UserDataResponse) => void): grpc.ClientUnaryCall;
    updateUser(request: user_pb.UpdateUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.UserDataResponse) => void): grpc.ClientUnaryCall;
    findUserById(request: user_pb.Id, callback: (error: grpc.ServiceError | null, response: user_pb.UserDataResponse) => void): grpc.ClientUnaryCall;
    findUserById(request: user_pb.Id, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.UserDataResponse) => void): grpc.ClientUnaryCall;
    findUserById(request: user_pb.Id, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.UserDataResponse) => void): grpc.ClientUnaryCall;
    findUser(request: user_pb.Query, callback: (error: grpc.ServiceError | null, response: user_pb.UserDataResponse) => void): grpc.ClientUnaryCall;
    findUser(request: user_pb.Query, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.UserDataResponse) => void): grpc.ClientUnaryCall;
    findUser(request: user_pb.Query, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.UserDataResponse) => void): grpc.ClientUnaryCall;
    addUserDetails(request: user_pb.UserDetails, callback: (error: grpc.ServiceError | null, response: user_pb.Response) => void): grpc.ClientUnaryCall;
    addUserDetails(request: user_pb.UserDetails, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.Response) => void): grpc.ClientUnaryCall;
    addUserDetails(request: user_pb.UserDetails, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.Response) => void): grpc.ClientUnaryCall;
    updateUserDetails(request: user_pb.UpdateUserDetailsRequest, callback: (error: grpc.ServiceError | null, response: user_pb.UserDetailsResponse) => void): grpc.ClientUnaryCall;
    updateUserDetails(request: user_pb.UpdateUserDetailsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.UserDetailsResponse) => void): grpc.ClientUnaryCall;
    updateUserDetails(request: user_pb.UpdateUserDetailsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.UserDetailsResponse) => void): grpc.ClientUnaryCall;
    findUserDetailsByUserId(request: user_pb.Id, callback: (error: grpc.ServiceError | null, response: user_pb.UserDetailsResponse) => void): grpc.ClientUnaryCall;
    findUserDetailsByUserId(request: user_pb.Id, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.UserDetailsResponse) => void): grpc.ClientUnaryCall;
    findUserDetailsByUserId(request: user_pb.Id, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.UserDetailsResponse) => void): grpc.ClientUnaryCall;
    addWorkerOptions(request: user_pb.WorkerOptions, callback: (error: grpc.ServiceError | null, response: user_pb.Response) => void): grpc.ClientUnaryCall;
    addWorkerOptions(request: user_pb.WorkerOptions, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.Response) => void): grpc.ClientUnaryCall;
    addWorkerOptions(request: user_pb.WorkerOptions, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.Response) => void): grpc.ClientUnaryCall;
    updateWorkerOptions(request: user_pb.WorkerOptionsRequest, callback: (error: grpc.ServiceError | null, response: user_pb.WorkerOptionsResponse) => void): grpc.ClientUnaryCall;
    updateWorkerOptions(request: user_pb.WorkerOptionsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.WorkerOptionsResponse) => void): grpc.ClientUnaryCall;
    updateWorkerOptions(request: user_pb.WorkerOptionsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.WorkerOptionsResponse) => void): grpc.ClientUnaryCall;
    findWorkerOptionsByUserId(request: user_pb.Id, callback: (error: grpc.ServiceError | null, response: user_pb.WorkerOptionsResponse) => void): grpc.ClientUnaryCall;
    findWorkerOptionsByUserId(request: user_pb.Id, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.WorkerOptionsResponse) => void): grpc.ClientUnaryCall;
    findWorkerOptionsByUserId(request: user_pb.Id, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.WorkerOptionsResponse) => void): grpc.ClientUnaryCall;
    validateLogin(request: user_pb.Login, callback: (error: grpc.ServiceError | null, response: user_pb.UserDataResponse) => void): grpc.ClientUnaryCall;
    validateLogin(request: user_pb.Login, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.UserDataResponse) => void): grpc.ClientUnaryCall;
    validateLogin(request: user_pb.Login, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.UserDataResponse) => void): grpc.ClientUnaryCall;
}

export class UserClient extends grpc.Client implements IUserClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public addUser(request: user_pb.UserData, callback: (error: grpc.ServiceError | null, response: user_pb.Response) => void): grpc.ClientUnaryCall;
    public addUser(request: user_pb.UserData, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.Response) => void): grpc.ClientUnaryCall;
    public addUser(request: user_pb.UserData, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.Response) => void): grpc.ClientUnaryCall;
    public updateUser(request: user_pb.UpdateUserRequest, callback: (error: grpc.ServiceError | null, response: user_pb.UserDataResponse) => void): grpc.ClientUnaryCall;
    public updateUser(request: user_pb.UpdateUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.UserDataResponse) => void): grpc.ClientUnaryCall;
    public updateUser(request: user_pb.UpdateUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.UserDataResponse) => void): grpc.ClientUnaryCall;
    public findUserById(request: user_pb.Id, callback: (error: grpc.ServiceError | null, response: user_pb.UserDataResponse) => void): grpc.ClientUnaryCall;
    public findUserById(request: user_pb.Id, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.UserDataResponse) => void): grpc.ClientUnaryCall;
    public findUserById(request: user_pb.Id, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.UserDataResponse) => void): grpc.ClientUnaryCall;
    public findUser(request: user_pb.Query, callback: (error: grpc.ServiceError | null, response: user_pb.UserDataResponse) => void): grpc.ClientUnaryCall;
    public findUser(request: user_pb.Query, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.UserDataResponse) => void): grpc.ClientUnaryCall;
    public findUser(request: user_pb.Query, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.UserDataResponse) => void): grpc.ClientUnaryCall;
    public addUserDetails(request: user_pb.UserDetails, callback: (error: grpc.ServiceError | null, response: user_pb.Response) => void): grpc.ClientUnaryCall;
    public addUserDetails(request: user_pb.UserDetails, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.Response) => void): grpc.ClientUnaryCall;
    public addUserDetails(request: user_pb.UserDetails, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.Response) => void): grpc.ClientUnaryCall;
    public updateUserDetails(request: user_pb.UpdateUserDetailsRequest, callback: (error: grpc.ServiceError | null, response: user_pb.UserDetailsResponse) => void): grpc.ClientUnaryCall;
    public updateUserDetails(request: user_pb.UpdateUserDetailsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.UserDetailsResponse) => void): grpc.ClientUnaryCall;
    public updateUserDetails(request: user_pb.UpdateUserDetailsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.UserDetailsResponse) => void): grpc.ClientUnaryCall;
    public findUserDetailsByUserId(request: user_pb.Id, callback: (error: grpc.ServiceError | null, response: user_pb.UserDetailsResponse) => void): grpc.ClientUnaryCall;
    public findUserDetailsByUserId(request: user_pb.Id, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.UserDetailsResponse) => void): grpc.ClientUnaryCall;
    public findUserDetailsByUserId(request: user_pb.Id, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.UserDetailsResponse) => void): grpc.ClientUnaryCall;
    public addWorkerOptions(request: user_pb.WorkerOptions, callback: (error: grpc.ServiceError | null, response: user_pb.Response) => void): grpc.ClientUnaryCall;
    public addWorkerOptions(request: user_pb.WorkerOptions, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.Response) => void): grpc.ClientUnaryCall;
    public addWorkerOptions(request: user_pb.WorkerOptions, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.Response) => void): grpc.ClientUnaryCall;
    public updateWorkerOptions(request: user_pb.WorkerOptionsRequest, callback: (error: grpc.ServiceError | null, response: user_pb.WorkerOptionsResponse) => void): grpc.ClientUnaryCall;
    public updateWorkerOptions(request: user_pb.WorkerOptionsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.WorkerOptionsResponse) => void): grpc.ClientUnaryCall;
    public updateWorkerOptions(request: user_pb.WorkerOptionsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.WorkerOptionsResponse) => void): grpc.ClientUnaryCall;
    public findWorkerOptionsByUserId(request: user_pb.Id, callback: (error: grpc.ServiceError | null, response: user_pb.WorkerOptionsResponse) => void): grpc.ClientUnaryCall;
    public findWorkerOptionsByUserId(request: user_pb.Id, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.WorkerOptionsResponse) => void): grpc.ClientUnaryCall;
    public findWorkerOptionsByUserId(request: user_pb.Id, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.WorkerOptionsResponse) => void): grpc.ClientUnaryCall;
    public validateLogin(request: user_pb.Login, callback: (error: grpc.ServiceError | null, response: user_pb.UserDataResponse) => void): grpc.ClientUnaryCall;
    public validateLogin(request: user_pb.Login, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.UserDataResponse) => void): grpc.ClientUnaryCall;
    public validateLogin(request: user_pb.Login, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.UserDataResponse) => void): grpc.ClientUnaryCall;
}
