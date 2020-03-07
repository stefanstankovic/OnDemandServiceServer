import * as grpc from 'grpc';
import userHelper from '../../helpers/user.helper';
import userDetailsHelper from '../../helpers/userDetails.helper';

import {
    UserData,
    UpdateUserRequest,
    UserDataResponse,
    UserDetails,
    UpdateUserDetailsRequest,
    UserDetailsResponse,
    WorkerOptions,
    WorkerOptionsRequest,
    WorkerOptionsResponse,
    Login,
    Response,
    Id,
    Query } from '../_proto/user/user_pb';
import { IUserServer, UserService } from '../_proto/user/user_grpc_pb';


class UserHandler implements IUserServer {
    addUser = (
        call: grpc.ServerUnaryCall<UserData>,
        callback: grpc.sendUnaryData<Response>)
        : void => {
            userHelper.AddUser(call.request)
            .then((response: Response) => {
                callback(null, response);
            });
    };

    updateUser = (
        call: grpc.ServerUnaryCall<UpdateUserRequest>,
        callback: grpc.sendUnaryData<UserDataResponse>): void => {
            userHelper.UpdateUser(call.request)
            .then((response) => {
                callback(null, response);
            });
    };

    findUserById = (
        call: grpc.ServerUnaryCall<Id>,
        callback: grpc.sendUnaryData<UserDataResponse>): void => {
            userHelper.FindUserById(call.request)
            .then((response) => {
                callback(null, response);
            });
    };

    findUser = (
        call: grpc.ServerUnaryCall<Query>,
        callback: grpc.sendUnaryData<UserDataResponse>)
        : void => {
            // TODO implement find user function
            callback(null, null);
    };

    addUserDetails = (
        call: grpc.ServerUnaryCall<UserDetails>,
        callback: grpc.sendUnaryData<Response>): void => {
            userDetailsHelper.AddUserDetails(call.request)
            .then((response) => {
                callback(null, response);
            });
    };

    updateUserDetails = (
        call: grpc.ServerUnaryCall<UpdateUserDetailsRequest>,
        callback: grpc.sendUnaryData<UserDetailsResponse>): void => {
            userDetailsHelper.UpdateUserDetails(call.request).then((response) => {
                callback(null, response);
            });
    };

    findUserDetailsByUserId = (
        call: grpc.ServerUnaryCall<Id>,
        callback: grpc.sendUnaryData<UserDetailsResponse>): void => {
            userDetailsHelper.FindUserDetailsByUserId(call.request).then((response) => {
                callback(null, response);
            });
    };

    addWorkerOptions = (
        call: grpc.ServerUnaryCall<WorkerOptions>,
        callback: grpc.sendUnaryData<Response>): void => {
            callback(null, null);
    };

    updateWorkerOptions = (
        call: grpc.ServerUnaryCall<WorkerOptionsRequest>,
        callback: grpc.sendUnaryData<WorkerOptionsResponse>): void => {
            callback(null, null);
    };

    findWorkerOptionsByUserId = (
        call: grpc.ServerUnaryCall<Id>,
        callback: grpc.sendUnaryData<WorkerOptionsResponse>): void => {
            callback(null, null);
    };

    validateLogin = (
        call: grpc.ServerUnaryCall<Login>,
        callback: grpc.sendUnaryData<UserDataResponse>): void => {
            userHelper.ValidateLogin(call.request).then((response: UserDataResponse) => {
                callback(null, response);
            })
    };
}

export default {
    server: UserService,
    handler: new UserHandler()
};