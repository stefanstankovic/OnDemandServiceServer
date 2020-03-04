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
   
    addUser = async (
        call: grpc.ServerUnaryCall<UserData>,
        callback: grpc.sendUnaryData<Response>) 
        : Promise<void> => {            
            const response = await userHelper.AddUser(call.request);
            callback(null, response);
    };

    updateUser = async (
        call: grpc.ServerUnaryCall<UpdateUserRequest>,
        callback: grpc.sendUnaryData<UserDataResponse>) 
        : Promise<void> => {
            const response = await userHelper.UpdateUser(call.request);
            callback(null, response);
    };

    findUserById = async (
        call: grpc.ServerUnaryCall<Id>,
        callback: grpc.sendUnaryData<UserDataResponse>) 
        : Promise<void> => {
            const response = await userHelper.FindUserById(call.request);
            callback(null, response);
            
    };

    findUser = async (
        call: grpc.ServerUnaryCall<Query>,
        callback: grpc.sendUnaryData<UserDataResponse>) 
        : Promise<void> => {
    };

    addUserDetails = async (
        call: grpc.ServerUnaryCall<UserDetails>, 
        callback: grpc.sendUnaryData<Response>) 
        : Promise<void> => {
            const response = await userDetailsHelper.AddUserDetails(call.request);
            callback(null, response);
    };

    updateUserDetails = async (
        call: grpc.ServerUnaryCall<UpdateUserDetailsRequest>,
        callback: grpc.sendUnaryData<UserDetailsResponse>) 
        : Promise<void> => {
            const response = await userDetailsHelper.UpdateUserDetails(call.request);
            callback(null, response);
    };

    findUserDetailsByUserId = async (
        call: grpc.ServerUnaryCall<Id>,
        callback: grpc.sendUnaryData<UserDetailsResponse>) 
        : Promise<void> => {
            const response = await userDetailsHelper.FindUserDetailsByUserId(call.request);
            callback(null, response);
    };

    addWorkerOptions = async (
        call: grpc.ServerUnaryCall<WorkerOptions>,
        callback: grpc.sendUnaryData<Response>)
        : Promise<void> => {
    };

    updateWorkerOptions = async(
        call: grpc.ServerUnaryCall<WorkerOptionsRequest>,
        callback: grpc.sendUnaryData<WorkerOptionsResponse>) 
        : Promise<void> => {
    };

    
    findWorkerOpstionsByUserId = async (
        call: grpc.ServerUnaryCall<Id>,
        callback: grpc.sendUnaryData<WorkerOptionsResponse>) 
        : Promise<void> => {
    };

    validateLogin = async (
        call: grpc.ServerUnaryCall<Login>,
        callback: grpc.sendUnaryData<Response>) 
        : Promise<void> => {
            const response = await userHelper.ValidateLogin(call.request);
            callback(null, response);
    };
    
} 

export default {
    server: UserService,
    handler: new UserHandler()
};