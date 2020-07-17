import { RequestHandler } from "express";
import { LocationType, Location } from "../models/workers/location.model";
import { isUndefined, set } from "lodash";
import { ServiceRegistry } from "../services/service.registry";
import { Events } from "../hooks/event.types/event.types";
import { Worker } from "../models/workers/worker.model";

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

  const workers = workersResponse.getWorkersList().map((worker) => {
    let response = {};
    const workerData = new Worker();
    workerData.grpsWorker = worker.getData()!;

    set(response, "worker", workerData.workerObject);

    const locationArray = worker.getLocationList().map((location) => {
      const locationData = new Location();
      locationData.grpcLocation = location;
      return locationData.locationObject;
    });

    set(response, "location", locationArray);

    return response;
  });

  res.status(201).json({ success: true, workers: workers });
  return next();
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
