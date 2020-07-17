import { Services, ServiceRegistry } from "../services/service.registry";
import { EventEmitter } from "events";
import { Events } from "./event.types/event.types";
import { UserType, UserRole, User } from "../models/user/user.model";
import { Worker } from "../models/workers/worker.model";
import { isUndefined, isNil, isEmpty } from "lodash";
import { LocationType, Location } from "../models/workers/location.model";
import {
  HireRequestType,
  HireRequest,
} from "../models/workers/hireWorker.model";
import { HireResponseType } from "../models/workers/hireResponse.model";
import { HireWorkerRequest, Status } from "../grpc/_proto/workers/workers_pb";
import { JobConfirmationData } from "../models/workers/types/jobConfirmation.type";
import { SocketEvents } from "./event.types/socket.event.types";

//mapping workers => employee
export const workers: { [key: string]: string } = {};

export class WorkersHook {
  public _evensBus: EventEmitter;

  constructor(public _services: Services) {
    this._evensBus = this._services.eventsBus;

    this._evensBus.on(Events.userConnectedOnSocket, this.userConnected);
    this._evensBus.on(Events.userLogIn, this.onUserLogIn);
    this._evensBus.on(Events.userSignUp, this.onUserLogIn);
    this._evensBus.on(Events.userLogout, this.onUserLogOut);
    this._evensBus.on(Events.userDisconnectedFromSocket, this.userDisconnected);
    this._evensBus.on(Events.workerChangedLocation, this.onChangeLocation);
    this._evensBus.on(Events.workerHireRequest, this.hireRequest);
    this._evensBus.on(Events.workerAcceptedHireRequest, this.onHireResponse);
    this._evensBus.on(Events.workerRejectedHireRequest, this.onHireResponse);
    this._evensBus.on(Events.jobConfirmed, this.onJobConfirmed);
  }

  /**
   * On log in event handler
   * @param args array of arguments
   * @param args[0] connected user. Expected type UserType
   * @param args[1] auth token. Expected type string
   */
  private async onUserLogIn(...args: any[]) {
    const user: UserType = args[0] as UserType;

    if (user.role !== UserRole.Worker) {
      return;
    }

    const workerDataResponse = await ServiceRegistry.getInstance().services.workersClient.getWorkerById(
      user.id!
    );

    if (!workerDataResponse.getSuccess()) {
      console.log({
        action: Events.userConnectedOnSocket,
        success: false,
        message: workerDataResponse.getMessage(),
      });

      const worker: Worker = new Worker(user.id, false, true, false);
      const response = await ServiceRegistry.getInstance().services.workersClient.addOrUpdateWorker(
        worker.grpsWorker
      );

      return;
    }

    const workerData = workerDataResponse.getWorkersList()[0];
    workerData.setActive(true);

    const response = await ServiceRegistry.getInstance().services.workersClient.addOrUpdateWorker(
      workerData
    );

    if (!response.getSuccess()) {
      console.log({
        action: Events.userConnectedOnSocket,
        success: false,
        message: response.getMessage(),
      });
      return;
    }
  }

  /**
   * On log out event handler
   * @param args array of arguments
   * @param args[0] object of {userId: string, deviceId: string}
   */
  private async onUserLogOut(...args: any[]) {
    const arg: { userId: string; deviceId: string } = args[0] as {
      userId: string;
      deviceId: string;
    };

    const userDataResponse = await ServiceRegistry.getInstance().services.userClient.findUserById(
      arg.userId
    );

    if (!userDataResponse.getSuccess()) {
      console.log({
        action: Events.userConnectedOnSocket,
        success: false,
        message: userDataResponse.getMessage(),
      });
      return;
    }

    const userObject = new User();
    userObject.grpcUserData = userDataResponse.getData()!;

    const user: UserType = userObject.userObject;

    if (user.role !== UserRole.Worker) {
      return;
    }

    const workerDataResponse = await ServiceRegistry.getInstance().services.workersClient.getWorkerById(
      user.id!
    );

    if (!workerDataResponse.getSuccess()) {
      console.log({
        action: Events.userConnectedOnSocket,
        success: false,
        message: workerDataResponse.getMessage(),
      });
      return;
    }

    const workerData = workerDataResponse.getWorkersList()[0];
    workerData.setActive(false);

    const response = await ServiceRegistry.getInstance().services.workersClient.addOrUpdateWorker(
      workerData
    );

    if (!response.getSuccess()) {
      console.log({
        action: Events.userConnectedOnSocket,
        success: false,
        message: response.getMessage(),
      });
      return;
    }
  }

  /**
   * On connect event handler
   * @param args array of arguments
   * @param args[0] connected user. Expected type UserType
   */
  private async userConnected(...args: any[]) {}

  /**
   * On disconnect event handler
   * @param args array of arguments
   * @param args[0] disconnected user. Expected type UserType
   */
  private async userDisconnected(...args: any[]) {}

  /**
   * On change location event handler
   * @param args array of params.
   * @param args[0] location object. Expected type LocationType
   */
  private async onChangeLocation(...args: any[]) {
    const location: LocationType | undefined = args[0] as LocationType;

    if (isUndefined(location)) {
      return;
    }

    const locationObject = new Location();
    locationObject.locationObject = location;

    await ServiceRegistry.getInstance().services.workersClient.updateWorkerLocation(
      locationObject.grpcLocation
    );

    if (
      isUndefined(workers[location.workerId]) ||
      isEmpty(workers[location.workerId])
    ) {
      const workerResponse = await ServiceRegistry.getInstance().services.workersClient.getWorkerById(
        location.workerId
      );

      if (!workerResponse.getSuccess()) {
        console.log({
          action: Events.workerChangedLocation,
          success: false,
          message: workerResponse.getMessage(),
        });
        return;
      }

      const workerData = workerResponse.getWorkersList()[0];
      workers[location.workerId] = workerData.getEmployerid();
    }

    if (
      !isUndefined(workers[location.workerId]) &&
      !isEmpty(workers[location.workerId])
    ) {
      try {
        ServiceRegistry.getInstance().services.eventsBus.emit(
          Events.notifyUser,
          SocketEvents.locationChanged,
          workers[location.workerId],
          location
        );
      } catch (ex) {
        const err = ex as Error;
        console.log(err.message);
      }
    }
  }

  /**
   * @param args array of params.
   * @param args[0] hire request object. Expected type HireRequestType
   */
  private async hireRequest(...args: any[]) {
    const hireRequest: HireRequestType = args[0] as HireRequestType;

    if (isNil(hireRequest)) {
      return;
    }

    console.log(JSON.stringify(hireRequest));
  }

  /**
   * On change location event handler
   * @param args array of params.
   * @param args[0] hire request object. Expected type HireRequestType
   * @param args[1] hire response object. Expected type HireResponseType
   */
  private async onHireResponse(...args: any[]) {
    const hireRequest = args[0] as HireRequestType;
    const hireResponse = args[1] as HireResponseType;

    if (hireResponse.accepted) {
      const workerDataResponse = await ServiceRegistry.getInstance().services.workersClient.getWorkerById(
        hireRequest.workerId
      );

      if (!workerDataResponse.getSuccess()) {
        console.log({
          action: Events.userConnectedOnSocket,
          success: false,
          message: workerDataResponse.getMessage(),
        });
        return;
      }

      const workerData = workerDataResponse.getWorkersList()[0];
      workerData.setBusy(true);
      workerData.setEmployerid(hireRequest.employerId);

      const statusUpdateResponse = await ServiceRegistry.getInstance().services.workersClient.addOrUpdateWorker(
        workerData
      );

      if (!statusUpdateResponse.getSuccess()) {
        console.log(
          `Updating worker status failed. Message: ${statusUpdateResponse.getMessage()}`
        );
        return;
      }

      hireRequest.status = "accepted";
      hireRequest.requestMessage += `|${hireResponse.responseMessage}`;

      var requestForUpdate = new HireRequest();
      requestForUpdate.hireRequestObject = hireRequest;

      const hireRequestUpdateResponse = await ServiceRegistry.getInstance().services.workersClient.updateHireRequest(
        requestForUpdate.grpcHireRequest
      );

      if (!hireRequestUpdateResponse.getSuccess()) {
        console.log(
          `Updating hire request failed. Message: ${hireRequestUpdateResponse.getMessage()}`
        );
        return;
      }

      workers[hireRequest.workerId] = hireRequest.employerId;
    } else {
      hireRequest.status = "declined";

      var requestForUpdate = new HireRequest();
      requestForUpdate.hireRequestObject = hireRequest;

      const hireRequestUpdateResponse = await ServiceRegistry.getInstance().services.workersClient.updateHireRequest(
        requestForUpdate.grpcHireRequest
      );

      if (!hireRequestUpdateResponse.getSuccess()) {
        console.log(
          `Updating hire request failed. Message: ${hireRequestUpdateResponse.getMessage()}`
        );
        return;
      }
    }
  }

  /**
   * On job finished
   * @param args array of params.
   * @param args[0] hire request object. Expected type HireRequestType
   * @param args[1] job confirmation object. Expected type JobConfirmationData
   */
  private async onJobConfirmed(...args: any[]) {
    const hireRequest: HireRequestType = args[0] as HireRequestType;
    const jobConfirmed: JobConfirmationData = args[1] as JobConfirmationData;

    const workerDataResponse = await ServiceRegistry.getInstance().services.workersClient.getWorkerById(
      jobConfirmed.workerId
    );

    if (!workerDataResponse.getSuccess()) {
      console.log({
        action: Events.userConnectedOnSocket,
        success: false,
        message: workerDataResponse.getMessage(),
      });
      return;
    }

    const workerData = workerDataResponse.getWorkersList()[0];
    workerData.setArchived(true);

    await ServiceRegistry.getInstance().services.workersClient.addOrUpdateWorker(
      workerData
    );

    const hireRequestData = new HireRequest();
    hireRequest.status = "confirmed";
    hireRequestData.hireRequestObject = hireRequest;

    await ServiceRegistry.getInstance().services.workersClient.updateHireRequest(
      hireRequestData.grpcHireRequest
    );

    delete workers[jobConfirmed.workerId];
  }
}
