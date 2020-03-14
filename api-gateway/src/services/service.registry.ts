import * as grpc from 'grpc';
import { UserClient } from './users/user.client';
import { NotificationClient } from './notifications/notifications.clinet';
import { RanksClient } from './ranks/ranks.client';
import { WorkersClient } from './workers/workers.client';

import { isNull, isUndefined } from 'lodash';
import { EventEmitter } from 'events';

export type Services = {
    eventsBus: EventEmitter,
    userClient: UserClient,
    notificationsClient: NotificationClient,
    ranksClient: RanksClient,
    workersClient: WorkersClient
}

export class ServiceRegistry {

    private static _instance: ServiceRegistry | null = null;
    private _userServiceClient: UserClient;
    private _eventBus: EventEmitter;
    private _notificationsClient: NotificationClient;
    private _ranksClient: RanksClient;
    private _workersClient: WorkersClient;

    private constructor() {
        this._eventBus = new EventEmitter();

        const grpcCredentials = grpc.credentials.createInsecure();
        let userServiceIp = !isUndefined (process.env.USERS_SVC_IP) ? process.env.USERS_SVC_IP : "127.0.0.1";
        let userServicePort = !isUndefined (process.env.USERS_SVC_PORT) ? process.env.USERS_SVC_PORT : "5001";
        this._userServiceClient = new UserClient(userServiceIp, userServicePort, grpcCredentials);

        let notificationsServiceIp = !isUndefined (process.env.NOTIFICATIONS_SVC_IP) ? process.env.NOTIFICATIONS_SVC_IP : "127.0.0.1";
        let notificationsServicePort = !isUndefined (process.env.NOTIFICATIONS_SVC_IP) ? process.env.NOTIFICATIONS_SVC_IP : "5002";
        this._notificationsClient = new NotificationClient(notificationsServiceIp, notificationsServicePort, grpcCredentials);

        let ranksServiceIp = !isUndefined (process.env.RANKS_SVC_IP) ? process.env.RANKS_SVC_IP : "127.0.0.1";
        let ranksServicePort = !isUndefined (process.env.RANKS_SVC_IP) ? process.env.RANKS_SVC_IP : "5003";
        this._ranksClient = new RanksClient(ranksServiceIp, ranksServicePort, grpcCredentials);

        let workersServiceIp = !isUndefined (process.env.WORKERS_SVC_IP) ? process.env.WORKERS_SVC_IP : "127.0.0.1";
        let workersServicePort = !isUndefined (process.env.WORKERS_SVC_IP) ? process.env.WORKERS_SVC_IP : "5004";
        this._workersClient = new WorkersClient(workersServiceIp, workersServicePort, grpcCredentials);
    }

    public static getInstance() : ServiceRegistry {

        if (isNull(ServiceRegistry._instance)){
            ServiceRegistry._instance = new ServiceRegistry();
        }

        return ServiceRegistry._instance
    }

    get services() : Services {
        return {
            eventsBus: this._eventBus,
            userClient: this._userServiceClient,
            notificationsClient: this._notificationsClient,
            ranksClient: this._ranksClient,
            workersClient: this._workersClient
        };
    }
}