import * as grpc from 'grpc';

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
} from '../_proto/workers/workers_pb';
import { IWorkersServer, WorkersService} from '../_proto/workers/workers_grpc_pb';

import { WorkersHelper } from '../../helpers/workers.helper';

class WorkersHandler implements IWorkersServer {
    private _workersHelper : WorkersHelper;

    constructor () {
        this._workersHelper = new WorkersHelper();
    }

    addWorker = (
        call: grpc.ServerUnaryCall<WorkerData>,
        callback: grpc.sendUnaryData<Response>)
        : void => {
            this._workersHelper
                .addOrUpdateWorker(call.request)
                .then((result) => {
                    callback(null, result);
                });
    };


    removeWorker = (
        call: grpc.ServerUnaryCall<WorkerId>,
        callback: grpc.sendUnaryData<Response>)
        : void => {
            this._workersHelper
                .removeWorker(call.request)
                .then((result) => {
                    callback(null, result);
                });
    };

    getWorkers = (
        call: grpc.ServerUnaryCall<WorkerStatus>,
        callback: grpc.sendUnaryData<WorkersResponse>)
        : void => {
            this._workersHelper
                .getWorkers(call.request)
                .then((result) => {
                    callback(null, result);
                });
    };

    freeWorkersInRadius = (
        call: grpc.ServerUnaryCall<Radius>,
        callback: grpc.sendUnaryData<WorkersResponse>)
        : void => {
            this._workersHelper
                .freeWorkersInRadius(call.request)
                .then((result) => {
                    callback(null, result);
                });
    };

    updateWorkerStatus = (
        call: grpc.ServerUnaryCall<Status>,
        callback: grpc.sendUnaryData<Response>)
        : void => {
            this._workersHelper
                .updateWorkerStatus(call.request)
                .then((result) => {
                    callback(null, result);
                });
    };

    updateWorkerLocation = (
        call: grpc.ServerUnaryCall<Location>,
        callback: grpc.sendUnaryData<Response>)
        : void => {
            this._workersHelper
                .updateWorkerLocation(call.request)
                .then((result) => {
                    callback(null, result);
                });
    };

    getWorkerLocation = (
        call: grpc.ServerUnaryCall<WorkerId>,
        callback: grpc.sendUnaryData<LocationResult>)
        : void => {
            this._workersHelper
                .getWorkerLocation(call.request)
                .then((result) => {
                    callback(null, result);
                });
    };
}

export default {
    server: WorkersService,
    handler: new WorkersHandler()
};