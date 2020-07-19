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
import { HireResponseType } from "../models/workers/hireResponse.model";
import { JobConfirmationData } from "../models/workers/types/jobConfirmation.type";

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

        let userData = user.getData();

        var userDetailsResponse = await ServiceRegistry.getInstance().services.userClient.findUserDetailsByUserId(
          value.getWorkerid()
        );

        if (!userDetailsResponse.getSuccess()) {
          return {
            id: value.getWorkerid(),
            active: value.getActive(),
            busy: value.getBusy(),
            email: userData?.getEmail(),
            mobile: userData?.getMobile(),
            name: "Worker",
          };
        }

        let userDetails = userDetailsResponse.getData();

        return {
          id: value.getWorkerid(),
          active: value.getActive(),
          busy: value.getBusy(),
          email: userData?.getEmail(),
          mobile: userData?.getMobile(),
          name: `${userDetails?.getFirstname()} ${userDetails?.getLastname()}`,
        };
      }
    )
  );

  res.status(201).json({ success: true, workers: workers });
  return next();
};

export const hireWorker: RequestHandler = async (req, res, next) => {
  let hireRequestBody: HireRequestType = req.body as HireRequestType;
  // @ts-ignore
  hireRequestBody.employerId = req.user.id;
  hireRequestBody.status = "pending";
  const hireRequest: HireRequest = new HireRequest();
  hireRequest.hireRequestObject = hireRequestBody;

  const response = await ServiceRegistry.getInstance().services.workersClient.addHireRequest(
    hireRequest.grpcHireRequest
  );

  if (!response.getSuccess()) {
    res.status(400).json({ success: false, message: response.getMessage() });
    return next();
  }

  hireRequestBody.id = response.getId();
  hireRequest.hireRequestObject = hireRequestBody;

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

  if (hireResponseBody.accepted) {
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

  res.status(201).json({ success: true });
  return next();
};

export const jobConfirmation: RequestHandler = async (req, res, next) => {
  const jobConfirmationBody: JobConfirmationData = req.body as JobConfirmationData;

  const hireRequestResponse = await ServiceRegistry.getInstance().services.workersClient.getHireRequestById(
    jobConfirmationBody.hireRequestId
  );

  if (!hireRequestResponse.getSuccess()) {
    res
      .status(400)
      .json({ success: false, message: hireRequestResponse.getMessage() });
    return next();
  }

  const hireRequest = hireRequestResponse.getRequestsList()[0];
  if (hireRequest.getStatus() !== "accepted") {
    res.status(400).json({
      success: false,
      message: `Request ${jobConfirmationBody.hireRequestId} isn't accepted!`,
    });
    return next();
  }

  //@ts-ignore
  if (hireRequest.getEmployerid() !== req.user.id) {
    res.status(400).json({
      success: false,
      //@ts-ignore
      message: `User ${req.user.id} can't confirm this job!`,
    });
    return next();
  }

  let hireRequestData: HireRequest = new HireRequest();
  hireRequestData.grpcHireRequest = hireRequest;

  ServiceRegistry.getInstance().services.eventsBus.emit(
    Events.jobConfirmed,
    hireRequestData.hireRequestObject,
    jobConfirmationBody
  );

  res.status(201).json({ success: true });
  return next();
};
