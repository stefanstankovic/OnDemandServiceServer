import * as grpc from 'grpc';
import {IUserClient, UserClient as GrpcUserClient} from '../../grpc/_proto/user/user_grpc_pb';
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
    Id
} from '../../grpc/_proto/user/user_pb';

import { ClientBase } from '../client.base';

export class UserClient extends ClientBase<IUserClient>
{
    constructor(userServiceIp: string, userServicePort : string, credentials: grpc.ChannelCredentials) {
        super(userServiceIp, userServicePort, credentials);

        this._client = new GrpcUserClient(
            `${this._serviceIp}:${this._servicePort}`, this._credentials);
    }

    public async addUser(user: UserData) : Promise<Response> {
        return new Promise<Response> ((resolve, reject) => {
            this._client!.addUser(user, (error: grpc.ServiceError | null, response: Response) : void => {
                if(error){
                    reject(error);
                }
                resolve(response);
            });
        });
    }

    public async updateUser(id: string, user: UserData) : Promise<UserDataResponse> {

        const updateUserRequest = new UpdateUserRequest();
        updateUserRequest.setId(id);
        updateUserRequest.setData(user);

        return new Promise<UserDataResponse> ((resolve, reject) => {
            this._client!.updateUser(updateUserRequest, (error: grpc.ServiceError | null, response: UserDataResponse) : void => {
                if(error){
                    reject(error);
                }
                resolve(response);
            });
        });
    }

    public async findUserById(id: string) : Promise<UserDataResponse>{
        if (!this._client) {
            throw new Error("User Client isn't initialized.");
        }

        const idRequest = new Id();
        idRequest.setId(id);

        return new Promise<UserDataResponse> ((resolve, reject) => {
            this._client!.findUserById(idRequest, (error: grpc.ServiceError | null, response: UserDataResponse) : void => {
                if(error){
                    reject(error);
                }
                resolve(response);
            });
        });
    }

    // public async findUser

    public async addUserDetails(userDetails : UserDetails) : Promise<Response> {
        return new Promise<Response> ((resolve, reject) => {
            this._client!.addUserDetails(userDetails, (error: grpc.ServiceError | null, response: Response) : void => {
                if(error){
                    reject(error);
                }
                resolve(response);
            });
        });
    }

    public async updateUserDetails (id: string, userDetails: UserDetails) : Promise<UserDetailsResponse> {
        if (!this._client) {
            throw new Error("User Client isn't initialized.");
        }

        const updateDetailsRequest = new UpdateUserDetailsRequest();
        updateDetailsRequest.setId(id);
        updateDetailsRequest.setData(userDetails);

        return new Promise<UserDetailsResponse> ((resolve, reject) => {
            this._client!.updateUserDetails(updateDetailsRequest, (error: grpc.ServiceError | null, response: UserDetailsResponse) : void => {
                if(error){
                    reject(error);
                }
                resolve(response);
            });
        });
    }

    public async findUserDetailsByUserId(userId: string) : Promise<UserDetailsResponse> {
        if (!this._client) {
            throw new Error("User Client isn't initialized.");
        }

        const idData = new Id();
        idData.setId(userId);

        return new Promise<UserDetailsResponse> ((resolve, reject) => {
            this._client!.findUserDetailsByUserId(idData, (error: grpc.ServiceError | null, response: UserDetailsResponse) : void => {
                if(error){
                    reject(error);
                }
                resolve(response);
            });
        });
    }

    public async addWorkerOptions (workerOptions : WorkerOptions) : Promise<Response> {
        if (!this._client) {
            throw new Error("User Client isn't initialized.");
        }

        return new Promise<Response> ((resolve, reject) => {
            this._client!.addWorkerOptions(workerOptions, (error: grpc.ServiceError | null, response: Response) : void => {
                if(error){
                    reject(error);
                }
                resolve(response);
            });
        });
    }

    public async updateWorkerOptions(id: string, workerOptions: WorkerOptions) : Promise<WorkerOptionsResponse> {
        const updateOptionsRequest = new WorkerOptionsRequest();
        updateOptionsRequest.setId(id);
        updateOptionsRequest.setData(workerOptions);

        return new Promise<WorkerOptionsResponse> ((resolve, reject) => {
            this._client!.updateWorkerOptions(updateOptionsRequest, (error: grpc.ServiceError | null, response: WorkerOptionsResponse) : void => {
                if(error){
                    reject(error);
                }
                resolve(response);
            });
        });
    }

    public async findWorkerOptionsByUserId(userId: string) : Promise<WorkerOptionsResponse> {
        if (!this._client) {
            throw new Error("User Client isn't initialized.");
        }

        const idData = new Id();
        idData.setId(userId);

        return new Promise<WorkerOptionsResponse> ((resolve, reject) => {
            this._client!.findWorkerOptionsByUserId(idData, (error: grpc.ServiceError | null, response: WorkerOptionsResponse) : void => {
                if(error){
                    reject(error);
                }
                resolve(response);
            });
        });
    }

    public async validateLogin(email: string, password: string) : Promise<Response> {
        if (!this._client) {
            throw new Error("User Client isn't initialized.");
        }

        const login = new Login();
        login.setEmail(email);
        login.setPassword(password);

        return new Promise<Response> ((resolve, reject) => {
            this._client!.validateLogin(login, (error: grpc.ServiceError | null, response: Response) : void => {
                if(error){
                    reject(error);
                }
                resolve(response);
            });
        });
    }
}