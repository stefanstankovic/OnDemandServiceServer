import { HireRequest as GrpcHireRequest } from "../../grpc/_proto/workers/workers_pb";

export type HireRequestType = {
  id: string;
  workerId: string;
  employerId: string;
  status: string;
  requestMessage: string;
};

export class HireRequest {
  constructor(
    private _id: string | null = null,
    private _workerId: string | null = null,
    private _employerId: string | null = null,
    private _status: string | null = null,
    private _requestMessage: string | null = null
  ) {}

  get grpcHireRequest(): GrpcHireRequest {
    const hireRequest = new GrpcHireRequest();

    hireRequest.setId(this._id!);
    hireRequest.setWorkerid(this._workerId!);
    hireRequest.setEmployerid(this._employerId!);
    hireRequest.setStatus(this._status!);
    hireRequest.setRequestmessage(this._requestMessage!);

    return hireRequest;
  }

  set grpcHireRequest(HireRequest: GrpcHireRequest) {
    this._id = HireRequest.getId();
    this._workerId = HireRequest.getWorkerid();
    this._employerId = HireRequest.getEmployerid();
    this._status = HireRequest.getStatus();
    this._requestMessage = HireRequest.getRequestmessage();
  }

  get hireRequestObject(): HireRequestType {
    return {
      id: this._id!,
      workerId: this._workerId!,
      employerId: this._employerId!,
      status: this._status!,
      requestMessage: this._requestMessage!,
    };
  }

  set hireRequestObject(hireRequest: HireRequestType) {
    this._id = hireRequest.id;
    this._workerId = hireRequest.workerId;
    this._employerId = hireRequest.employerId;
    this._status = hireRequest.status;
    this._requestMessage = hireRequest.requestMessage;
  }
}
