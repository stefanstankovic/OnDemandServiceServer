import * as grpc from "grpc";

import {
  WorkerData,
  WorkerId,
  WorkerStatus,
  WorkersResponse,
  Response,
  Radius,
  Location,
  Status,
  LocationResult,
  HireWorkerRequest,
  EmployerId,
  AllWorkersForEmployerResponse,
  HireRequest,
  HireRequestQuery,
  HireRequestResponse,
} from "../_proto/workers/workers_pb";
import {
  IWorkersServer,
  WorkersService,
} from "../_proto/workers/workers_grpc_pb";

import { WorkersHelper } from "../../helpers/workers.helper";
import { HireRequestHelper } from "../../helpers/hireRequest.helper";

class WorkersHandler implements IWorkersServer {
  private _workersHelper: WorkersHelper;
  private _hireRequestHelper: HireRequestHelper;

  constructor() {
    this._workersHelper = new WorkersHelper();
    this._hireRequestHelper = new HireRequestHelper();
  }

  addWorker = (
    call: grpc.ServerUnaryCall<WorkerData>,
    callback: grpc.sendUnaryData<Response>
  ): void => {
    this._workersHelper.addOrUpdateWorker(call.request).then((result) => {
      callback(null, result);
    });
  };

  removeWorker = (
    call: grpc.ServerUnaryCall<WorkerId>,
    callback: grpc.sendUnaryData<Response>
  ): void => {
    this._workersHelper.removeWorker(call.request).then((result) => {
      callback(null, result);
    });
  };

  getWorkers = (
    call: grpc.ServerUnaryCall<WorkerStatus>,
    callback: grpc.sendUnaryData<WorkersResponse>
  ): void => {
    this._workersHelper.getWorkers(call.request).then((result) => {
      callback(null, result);
    });
  };

  freeWorkersInRadius = (
    call: grpc.ServerUnaryCall<Radius>,
    callback: grpc.sendUnaryData<WorkersResponse>
  ): void => {
    this._workersHelper.freeWorkersInRadius(call.request).then((result) => {
      callback(null, result);
    });
  };

  updateWorkerStatus = (
    call: grpc.ServerUnaryCall<Status>,
    callback: grpc.sendUnaryData<Response>
  ): void => {
    this._workersHelper.updateWorkerStatus(call.request).then((result) => {
      callback(null, result);
    });
  };

  updateWorkerLocation = (
    call: grpc.ServerUnaryCall<Location>,
    callback: grpc.sendUnaryData<Response>
  ): void => {
    this._workersHelper.updateWorkerLocation(call.request).then((result) => {
      callback(null, result);
    });
  };

  getWorkerLocation = (
    call: grpc.ServerUnaryCall<WorkerId>,
    callback: grpc.sendUnaryData<LocationResult>
  ): void => {
    this._workersHelper.getWorkerLocation(call.request).then((result) => {
      callback(null, result);
    });
  };

  hireWorker = (
    call: grpc.ServerUnaryCall<HireWorkerRequest>,
    callback: grpc.sendUnaryData<Response>
  ): void => {
    this._workersHelper.hireWorker(call.request).then((result) => {
      callback(null, result);
    });
  };

  allWorkersForEmployer = (
    call: grpc.ServerUnaryCall<EmployerId>,
    callback: grpc.sendUnaryData<AllWorkersForEmployerResponse>
  ): void => {
    this._workersHelper.allWorkersForEmployer(call.request).then((result) => {
      callback(null, result);
    });
  };

  addHireRequest = (
    call: grpc.ServerUnaryCall<HireRequest>,
    callback: grpc.sendUnaryData<Response>
  ): void => {
    this._hireRequestHelper.addHireRequest(call.request).then((result) => {
      callback(null, result);
    });
  };

  getHireRequests = (
    call: grpc.ServerUnaryCall<HireRequestQuery>,
    callback: grpc.sendUnaryData<HireRequestResponse>
  ): void => {
    this._hireRequestHelper.getHireRequests(call.request).then((result) => {
      callback(null, result);
    });
  };

  updateHireRequest = (
    call: grpc.ServerUnaryCall<HireRequest>,
    callback: grpc.sendUnaryData<Response>
  ): void => {
    this._hireRequestHelper.updateHireRequest(call.request).then((result) => {
      callback(null, result);
    });
  };
}

export default {
  server: WorkersService,
  handler: new WorkersHandler(),
};
