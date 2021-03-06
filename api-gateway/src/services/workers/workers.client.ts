import * as grpc from "grpc";
import {
  IWorkersClient,
  WorkersClient as GrpcWorkersClient,
} from "../../grpc/_proto/workers/workers_grpc_pb";

import { ClientBase } from "../client.base";

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
  HireRequestId,
} from "../../grpc/_proto/workers/workers_pb";

export class WorkersClient extends ClientBase<IWorkersClient> {
  constructor(
    workersServiceIp: string,
    workersServicePort: string,
    credentials: grpc.ChannelCredentials
  ) {
    super(workersServiceIp, workersServicePort, credentials);

    this._client = new GrpcWorkersClient(
      `${this._serviceIp}:${this._servicePort}`,
      this._credentials
    );
  }

  addOrUpdateWorker(worker: WorkerData): Promise<Response> {
    return new Promise<Response>((resolve, reject) => {
      this._client!.addWorker(
        worker,
        (error: grpc.ServiceError | null, response: Response): void => {
          if (error) {
            reject(error);
          }
          resolve(response);
        }
      );
    });
  }

  removeWorker(workerId: string): Promise<Response> {
    const workerIdData = new WorkerId();
    workerIdData.setWorkerid(workerId);

    return new Promise<Response>((resolve, reject) => {
      this._client!.removeWorker(
        workerIdData,
        (error: grpc.ServiceError | null, response: Response): void => {
          if (error) {
            reject(error);
          }
          resolve(response);
        }
      );
    });
  }

  getWorkers(workerStatus: WorkerStatus): Promise<WorkersResponse> {
    return new Promise<WorkersResponse>((resolve, reject) => {
      this._client!.getWorkers(
        workerStatus,
        (error: grpc.ServiceError | null, response: WorkersResponse): void => {
          if (error) {
            reject(error);
          }
          resolve(response);
        }
      );
    });
  }

  getWorkerById(id: string): Promise<WorkersResponse> {
    const workerId: WorkerId = new WorkerId();
    workerId.setWorkerid(id);

    return new Promise<WorkersResponse>((resolve, reject) => {
      this._client!.getWorkerById(
        workerId,
        (error: grpc.ServiceError | null, response: WorkersResponse): void => {
          if (error) {
            reject(error);
          }
          resolve(response);
        }
      );
    });
  }

  getFreeWorkersInRadius(radius: Radius): Promise<WorkersResponse> {
    return new Promise<WorkersResponse>((resolve, reject) => {
      this._client!.freeWorkersInRadius(
        radius,
        (error: grpc.ServiceError | null, response: WorkersResponse): void => {
          if (error) {
            reject(error);
          }
          resolve(response);
        }
      );
    });
  }

  updateWorkerStatus(status: Status): Promise<Response> {
    return new Promise<Response>((resolve, reject) => {
      this._client!.updateWorkerStatus(
        status,
        (error: grpc.ServiceError | null, response: Response): void => {
          if (error) {
            reject(error);
          }
          resolve(response);
        }
      );
    });
  }

  updateWorkerLocation(location: Location): Promise<Response> {
    return new Promise<Response>((resolve, reject) => {
      this._client!.updateWorkerLocation(
        location,
        (error: grpc.ServiceError | null, response: Response): void => {
          if (error) {
            reject(error);
          }
          resolve(response);
        }
      );
    });
  }

  getWorkerLocation(workerId: string): Promise<LocationResult> {
    const workerIdData = new WorkerId();
    workerIdData.setWorkerid(workerId);

    return new Promise<LocationResult>((resolve, reject) => {
      this._client!.getWorkerLocation(
        workerIdData,
        (error: grpc.ServiceError | null, response: LocationResult): void => {
          if (error) {
            reject(error);
          }
          resolve(response);
        }
      );
    });
  }

  hireWorker(workerRequest: HireWorkerRequest): Promise<Response> {
    return new Promise<Response>((resolve, reject) => {
      this._client!.hireWorker(
        workerRequest,
        (error: grpc.ServiceError | null, response: Response): void => {
          if (error) {
            reject(error);
          }
          resolve(response);
        }
      );
    });
  }

  allWorkersForEmployer(
    employerId: string
  ): Promise<AllWorkersForEmployerResponse> {
    const workerIdData = new EmployerId();
    workerIdData.setId(employerId);

    return new Promise<AllWorkersForEmployerResponse>((resolve, reject) => {
      this._client!.allWorkersForEmployer(
        workerIdData,
        (
          error: grpc.ServiceError | null,
          response: AllWorkersForEmployerResponse
        ): void => {
          if (error) {
            reject(error);
          }
          resolve(response);
        }
      );
    });
  }

  addHireRequest(reques: HireRequest): Promise<Response> {
    return new Promise<Response>((resolve, reject) => {
      this._client!.addHireRequest(
        reques,
        (error: grpc.ServiceError | null, response: Response): void => {
          if (error) {
            reject(error);
          }
          resolve(response);
        }
      );
    });
  }

  getHireRequests(query: HireRequestQuery): Promise<HireRequestResponse> {
    return new Promise<HireRequestResponse>((resolve, reject) => {
      this._client!.getHireRequests(
        query,
        (
          error: grpc.ServiceError | null,
          response: HireRequestResponse
        ): void => {
          if (error) {
            reject(error);
          }
          resolve(response);
        }
      );
    });
  }

  updateHireRequest(request: HireRequest): Promise<Response> {
    return new Promise<Response>((resolve, reject) => {
      this._client!.updateHireRequest(
        request,
        (error: grpc.ServiceError | null, response: Response): void => {
          if (error) {
            reject(error);
          }
          resolve(response);
        }
      );
    });
  }

  getHireRequestById(workerId: string): Promise<HireRequestResponse> {
    const idData = new HireRequestId();
    idData.setId(workerId);

    return new Promise<HireRequestResponse>((resolve, reject) => {
      this._client!.getHireRequestById(
        idData,
        (
          error: grpc.ServiceError | null,
          response: HireRequestResponse
        ): void => {
          if (error) {
            reject(error);
          }
          resolve(response);
        }
      );
    });
  }
}
