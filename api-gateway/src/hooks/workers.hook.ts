import { Services, ServiceRegistry } from "../services/service.registry";
import { EventEmitter } from "events";
import { Events } from "./event.types/event.types";
import { UserType, UserRole } from "../models/user/user.model";
import { Worker } from "../models/workers/worker.model";
import { isUndefined, isNil } from "lodash";
import { LocationType, Location } from "../models/workers/location.model";
import { HireRequestType } from "../models/workers/hireWorker.model";

export class WorkersHook {
  public _evensBus: EventEmitter;

  constructor(public _services: Services) {
    this._evensBus = this._services.eventsBus;

    this._evensBus.on(Events.userConnectedOnSocket, this.userConnected);
    this._evensBus.on(Events.userDisconnectedFromSocket, this.userDisconnected);
    this._evensBus.on(Events.workerChangedLocation, this.onChangeLocation);
    this._evensBus.on(Events.workerHireRequest, this.hireRequest);
    this._evensBus.on(Events.workerAcceptedHireRequest, this.onHireResponse);
    this._evensBus.on(Events.workerRejectedHireRequest, this.onHireResponse);
  }
  /**
   * On connect event handler
   * @param args array of arguments
   * @param args[0] connected user. Expected type UserType
   */
  private async userConnected(...args: any[]) {
    const user: UserType = args[0] as UserType;

    if (user.role !== UserRole.Worker) {
      return;
    }

    const worker: Worker = new Worker(user.id, false, true, null);

    await ServiceRegistry.getInstance().services.workersClient.addOrUpdateWorker(
      worker.grpsWorker
    );
  }

  /**
   * On disconnect event handler
   * @param args array of arguments
   * @param args[0] disconnected user. Expected type UserType
   */
  private async userDisconnected(...args: any[]) {
    const user: UserType = args[0] as UserType;

    if (user.role !== UserRole.Worker) {
      return;
    }

    const worker: Worker = new Worker(user.id, false, false, null);

    await ServiceRegistry.getInstance().services.workersClient.addOrUpdateWorker(
      worker.grpsWorker
    );
  }

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
  private async onHireResponse(...args: any[]) {}
}
