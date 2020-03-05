import * as grpc from 'grpc';
import { UserClient } from './users/user.client';
import { isNull, isUndefined } from 'lodash';

export class ServiceRegistry {

    private static _instance : ServiceRegistry | null = null;
    private _userServiceClient : UserClient;

    private constructor(){
        const grpcCredentials = grpc.credentials.createInsecure();
        let userServiceIp = !isUndefined (process.env.USERS_SVC_IP) ? process.env.USERS_SVC_IP : "127.0.0.1";
        let userServicePort = !isUndefined (process.env.USERS_SVC_PORT) ? process.env.USERS_SVC_PORT : "5001";
        this._userServiceClient = new UserClient(userServiceIp, userServicePort, grpcCredentials);
    }

    public static getInstance() : ServiceRegistry {

        if (isNull(ServiceRegistry._instance)){
            ServiceRegistry._instance = new ServiceRegistry();
        }

        return ServiceRegistry._instance
    }

    get services() {
        return {
            userService: this._userServiceClient
        };
    }
}