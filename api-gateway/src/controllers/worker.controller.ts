import { RequestHandler } from "express";
import {
  WorkerStatus,
  WorkersResponse,
} from "../grpc/_proto/workers/workers_pb";

import { ServiceRegistry } from "../services/service.registry";
import {
  HireRequestType,
  HireRequest,
} from "../models/workers/hireWorker.model";
import { Events } from "../hooks/event.types/event.types";
import {
  HireResponseType,
  HireResponse,
} from "../models/workers/hireResponse.model";

export const allWorkers: RequestHandler = async (req, res, next) => {
  const workerStatus: WorkerStatus = new WorkerStatus();
  workerStatus.setActive(true);
  workerStatus.setBusy(false);

  const workersResponse: WorkersResponse = await ServiceRegistry.getInstance().services.workersClient.getWorkers(
    workerStatus
  );

  if (!workersResponse.getSuccess()) {
    res
      .status(400)
      .json({ success: false, message: workersResponse.getMessage() });
    return next();
  }

  let workers = await Promise.all(
    workersResponse.getWorkersList().map(
      async (value, index): Promise<object | undefined> => {
        let user = await ServiceRegistry.getInstance().services.userClient.findUserById(
          value.getWorkerid()
        );

        if (!user.getSuccess()) {
          return undefined;
        }

        var userData = user.getData();

        return {
          active: value.getActive(),
          busy: value.getBusy(),
          email: userData?.getEmail(),
        };
      }
    )
  );

  res.status(201).json({ success: true, workers: workers });
  return next();
};

export const hireWorker: RequestHandler = async (req, res, next) => {
  let hireRequestBody: HireRequestType = req.body as HireRequestType;
  const hireRequest: HireRequest = new HireRequest();
  hireRequest.hireRequestObject = hireRequestBody;

  const response = await ServiceRegistry.getInstance().services.workersClient.hireWorker(
    hireRequest.grpcHireRequest
  );

  if (!response.getSuccess()) {
    res.status(400).json({ success: false, message: response.getMessage() });
    return next();
  }

  ServiceRegistry.getInstance().services.eventsBus.emit(
    Events.workerHireRequest,
    hireRequest.hireRequestObject
  );

  res.status(201).json({ success: true });
  return next();
};

export const hireResponse: RequestHandler = async (req, res, next) => {
  let hireResponseBody: HireResponseType = req.body as HireResponseType;
  let hireRequestResponse = await ServiceRegistry.getInstance().services.workersClient.getHireRequestById(
    hireResponseBody.hireRequestId
  );

  if (!hireRequestResponse.getSuccess()) {
    res
      .status(400)
      .json({ success: false, message: hireRequestResponse.getMessage() });
    return next();
  }

  let hireRequest: HireRequest = new HireRequest();
  hireRequest.grpcHireRequest = hireRequestResponse.getRequestsList()[0];

  if (!hireResponseBody.accepted) {
    ServiceRegistry.getInstance().services.eventsBus.emit(
      Events.workerAcceptedHireRequest,
      hireRequest.hireRequestObject,
      hireResponseBody
    );
  } else {
    ServiceRegistry.getInstance().services.eventsBus.emit(
      Events.workerRejectedHireRequest,
      hireRequest.hireRequestObject,
      hireResponseBody
    );
  }

  return next();
};
