import * as grpc from 'grpc';
import {
    IWorkersClient,
    WorkersClient as GrpcWorkersClient
} from '../../grpc/_proto/workers/workers_grpc_pb';

import { ClientBase } from '../client.base';

import {
    WorkerData,
    WorkerId, 
    WorkerStatus,
    WorkersResponse,
    Response,
    Radius,
    Location,
    Status,
    LocationResult
} from '../../grpc/_proto/workers/workers_pb';

export class WorkersClient extends ClientBase<IWorkersClient> {
    constructor(workersServiceIp: string, workersServicePort: string, credentials: grpc.ChannelCredentials) {
        super(workersServiceIp, workersServicePort, credentials);

        this._client = new GrpcWorkersClient(
            `${this._serviceIp}:${this._servicePort}`, this._credentials);
    }

    addOrUpdateWorker (worker: WorkerData): Promise<Response> {
        return new Promise<Response> ((resolve, reject) => {
            this._client!.addWorker(worker, (error: grpc.ServiceError | null, response: Response) : void => {
                if(error){
                    reject(error);
                }
                resolve(response);
            });
        });
    }

    removeWorker(workerId: string): Promise<Response> {
        const workerIdData = new WorkerId();
        workerIdData.setWorkerid(workerId);

        return new Promise<Response> ((resolve, reject) => {
            this._client!.removeWorker(workerIdData, (error: grpc.ServiceError | null, response: Response) : void => {
                if(error){
                    reject(error);
                }
                resolve(response);
            });
        });
    }

    getWorkers (workerStatus: WorkerStatus): Promise<WorkersResponse> {
        return new Promise<WorkersResponse> ((resolve, reject) => {
            this._client!.getWorkers(workerStatus, (error: grpc.ServiceError | null, response: WorkersResponse) : void => {
                if(error){
                    reject(error);
                }
                resolve(response);
            });
        });
    }

    getFreeWorkersInRadius (radius: Radius): Promise<WorkersResponse> {
        return new Promise<WorkersResponse> ((resolve, reject) => {
            this._client!.freeWorkersInRadius(radius, (error: grpc.ServiceError | null, response: WorkersResponse) : void => {
                if(error){
                    reject(error);
                }
                resolve(response);
            });
        });
    }

    updateWorkerStatus (status: Status): Promise<Response> {
        return new Promise<Response> ((resolve, reject) => {
            this._client!.updateWorkerStatus(status, (error: grpc.ServiceError | null, response: Response) : void => {
                if(error){
                    reject(error);
                }
                resolve(response);
            });
        });
    }

    updateWorkerLocation (location: Location): Promise<Response> {
        return new Promise<Response> ((resolve, reject) => {
            this._client!.updateWorkerLocation(location, (error: grpc.ServiceError | null, response: Response) : void => {
                if(error){
                    reject(error);
                }
                resolve(response);
            });
        });
    }

    getWorkerLocation (workerId: string): Promise<LocationResult> {
        const workerIdData = new WorkerId();
        workerIdData.setWorkerid(workerId);

        return new Promise<LocationResult> ((resolve, reject) => {
            this._client!.getWorkerLocation(workerIdData, (error: grpc.ServiceError | null, response: LocationResult) : void => {
                if(error){
                    reject(error);
                }
                resolve(response);
            });
        });
    }
}

