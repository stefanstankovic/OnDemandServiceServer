import { RequestHandler } from "express";
import {
  WorkerStatus,
  WorkersResponse,
} from "../grpc/_proto/workers/workers_pb";

import { ServiceRegistry } from "../services/service.registry";

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
};
