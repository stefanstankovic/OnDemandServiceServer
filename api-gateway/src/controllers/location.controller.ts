import { RequestHandler } from "express";
import { LocationType, Location } from "../models/workers/location.model";
import { isUndefined, set } from "lodash";
import { ServiceRegistry } from "../services/service.registry";
import { Events } from "../hooks/event.types/event.types";
import { Worker } from "../models/workers/worker.model";
import { User } from "../models/user/user.model";
import { UserDetails } from "../models/user/userDetails.model";
import { WorkerDetailsData } from "../models/workers/types/workerDetails.type";
import { WorkerData } from "../grpc/_proto/workers/workers_pb";
import { UserData } from "../grpc/_proto/user/user_pb";

const getWorkerDetails = async (
  workerId: string
): Promise<WorkerDetailsData> => {
  let workerDetails: WorkerDetailsData = {
    name: "Worker",
    mobile: "nomobile",
    email: "nophone",
  };
  const userDetailsResponse = await ServiceRegistry.getInstance().services.userClient.findUserDetailsByUserId(
    workerId
  );

  const userResponse = await ServiceRegistry.getInstance().services.userClient.findUserById(
    workerId
  );

  if (userDetailsResponse.getSuccess()) {
    workerDetails.name =
      `${userDetailsResponse.getData()?.getFirstname()} ` +
      `${userDetailsResponse.getData()?.getLastname()}`;
  }

  if (userResponse.getSuccess()) {
    workerDetails.mobile = userResponse.getData()?.getMobile();
    workerDetails.email = userResponse.getData()?.getEmail();
  }

  return workerDetails;
};

export const allWorkersForEmployer: RequestHandler = async (req, res, next) => {
  // @ts-ignore
  const employerId = req.user.id;

  const workersResponse = await ServiceRegistry.getInstance().services.workersClient.allWorkersForEmployer(
    employerId
  );

  if (!workersResponse.getSuccess()) {
    res
      .status(400)
      .json({ success: false, message: workersResponse.getMessage() });
    return next();
  }

  const workers = await Promise.all(
    workersResponse.getWorkersList().map(async (worker) => {
      let response = {};
      const workerData = new Worker();
      workerData.grpsWorker = worker.getData()!;

      set(response, "worker", workerData.workerObject);

      const userDetails = await getWorkerDetails(
        workerData.workerObject.workerId
      );
      set(response, "workerDetails", userDetails);

      const locationArray = worker.getLocationList().map((location) => {
        const locationData = new Location();
        locationData.grpcLocation = location;
        return locationData.locationObject;
      });

      set(response, "location", locationArray);

      return response;
    })
  );

  res.status(201).json({ success: true, workers: workers });
  return next();
};

export const workerDetails: RequestHandler = async (req, res, next) => {
  const { workerId } = req.params;
  const workerDetails = await getWorkerDetails(workerId);

  res.status(201).json({ success: true, workerDetails: workerDetails });
};

export const addLocation: RequestHandler = async (req, res, next) => {
  const locationBody: LocationType = req.body as LocationType;

  if (
    isUndefined(locationBody.workerId) ||
    isUndefined(locationBody.latitude) ||
    isUndefined(locationBody.longitude)
  ) {
    res.status(400).json({ success: false, message: "Invalid input." });
    return next();
  }

  const location = new Location();
  location.locationObject = locationBody;

  const response = await ServiceRegistry.getInstance().services.workersClient.updateWorkerLocation(
    location.grpcLocation
  );

  if (!response.getSuccess()) {
    res.status(400).json({ success: false, message: response.getMessage() });
    return next();
  }

  ServiceRegistry.getInstance().services.eventsBus.emit(
    Events.newLocationAdded,
    location.locationObject
  );

  res.status(201).json({ success: true });
  return next();
};
