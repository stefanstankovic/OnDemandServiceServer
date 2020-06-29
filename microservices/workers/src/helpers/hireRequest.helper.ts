import {
  HireRequest as GrpcHireRequest,
  HireRequestQuery,
  HireRequestResponse,
  Response,
  HireRequestId,
} from "../grpc/_proto/workers/workers_pb";

import HireRequest, { IHireRequest } from "../models/hireRequest.model";
import { isNil, set, isUndefined } from "lodash";

export class HireRequestHelper {
  constructor() {}

  public async addHireRequest(hireRequest: GrpcHireRequest): Promise<Response> {
    const result = new Response();
    try {
      let newRequest = new HireRequest();
      newRequest.workerId = hireRequest.getWorkerid();
      newRequest.employer = hireRequest.getEmployerid();
      newRequest.status = "pending";
      newRequest.requestMessage = hireRequest.getRequestmessage();

      let req = await newRequest.save();
      result.setId(req.id);
      result.setSuccess(true);
    } catch (ex) {
      var err = ex as Error;
      result.setSuccess(false);
      result.setMessage(err.message);
    }
    return result;
  }

  public async getHireRequests(
    hireRequestQuery: HireRequestQuery
  ): Promise<HireRequestResponse> {
    const result = new HireRequestResponse();
    try {
      let searchQuery = {};
      if (!isNil(hireRequestQuery.getEmployerid())) {
        set(searchQuery, "employer", hireRequestQuery.getEmployerid());
      }
      if (!isNil(hireRequestQuery.getWorkerid())) {
        set(searchQuery, "workerId", hireRequestQuery.getWorkerid());
      }
      if (!isNil(hireRequestQuery.getStatus())) {
        set(searchQuery, "status", hireRequestQuery.getStatus());
      }

      let hireRequests: IHireRequest[] = await HireRequest.find(
        hireRequestQuery
      ).exec();

      var grpcHireRequest: GrpcHireRequest[] = hireRequests.map(
        (val, index) => {
          let req: GrpcHireRequest = new GrpcHireRequest();
          req.setId(val.id);
          req.setWorkerid(val.workerId);
          req.setEmployerid(val.employer);
          req.setStatus(val.status);
          req.setRequestmessage(val.requestMessage);

          return req;
        }
      );

      result.setSuccess(true);
      result.setRequestsList(grpcHireRequest);
    } catch (ex) {
      var err = ex as Error;
      result.setSuccess(false);
      result.setMessage(err.message);
    }
    return result;
  }

  public async getHireRequestById(
    requestId: HireRequestId
  ): Promise<HireRequestResponse> {
    const result = new HireRequestResponse();
    try {
      if (isUndefined(requestId.getId())) {
        throw new Error("Hire Request ID is missing!");
      }

      const hireRequest = await HireRequest.findById(requestId.getId()).exec();

      if (isNil(hireRequest)) {
        throw new Error(
          `Hire Request with ID ${requestId.getId()} doesn't exist!`
        );
      }

      let req: GrpcHireRequest = new GrpcHireRequest();
      req.setId(hireRequest.id);
      req.setWorkerid(hireRequest.workerId);
      req.setEmployerid(hireRequest.employer);
      req.setStatus(hireRequest.status);
      req.setRequestmessage(hireRequest.requestMessage);

      let requestList = new Array<GrpcHireRequest>();
      requestList.push(req);

      result.setRequestsList(requestList);
      result.setSuccess(true);
    } catch (ex) {
      var err = ex as Error;
      result.setSuccess(false);
      result.setMessage(err.message);
    }
    return result;
  }

  public async updateHireRequest(
    hireRequest: GrpcHireRequest
  ): Promise<Response> {
    const result = new Response();
    try {
      if (isUndefined(hireRequest.getId())) {
        throw new Error("Update Request: Id is missing");
      }
      let propertiesForUpdate = {};
      if (!isNil(hireRequest.getEmployerid())) {
        set(propertiesForUpdate, "employer", hireRequest.getEmployerid());
      }
      if (!isNil(hireRequest.getWorkerid())) {
        set(propertiesForUpdate, "workerId", hireRequest.getWorkerid());
      }
      if (!isNil(hireRequest.getStatus())) {
        set(propertiesForUpdate, "status", hireRequest.getStatus());
      }
      if (!isNil(hireRequest.getRequestmessage())) {
        set(
          propertiesForUpdate,
          "requestMessage",
          hireRequest.getRequestmessage()
        );
      }

      await HireRequest.updateOne(
        { _id: hireRequest.getId() },
        propertiesForUpdate
      ).exec();

      result.setSuccess(true);
      result.setId(hireRequest.getId());
    } catch (ex) {
      var err = ex as Error;
      result.setSuccess(false);
      result.setMessage(err.message);
    }
    return result;
  }
}
