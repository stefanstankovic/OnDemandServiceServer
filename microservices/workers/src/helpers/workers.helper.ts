import {
  WorkerData,
  WorkerId,
  WorkerStatus,
  WorkersResponse,
  Response,
  Radius,
  Location as GrpcLocation,
  Status,
  Paging,
  LocationResult,
  HireWorkerRequest,
  EmployerId,
  AllWorkersForEmployerResponse,
  HiredWorker,
} from "../grpc/_proto/workers/workers_pb";
import Worker, { IWorker } from "../models/worker.model";

import Location, { ILocation } from "../models/location.model";
import { isNull, isUndefined, set, isBoolean, isString, isNil } from "lodash";
//import { isPointWithinRadius } from "geolib";

export class WorkersHelper {
  constructor() {}

  public async getWorkerById(workerId: WorkerId): Promise<WorkersResponse> {
    const result = new WorkersResponse();
    try {
      let worker: IWorker | null;
      worker = await Worker.findOne({
        workerId: workerId.getWorkerid(),
        archived: false,
      });

      if (isNil(worker)) {
        throw new Error("Worker doesn't exist");
      }

      const workersArray: Array<WorkerData> = new Array();
      workersArray.push(this.DbWorkerToWorkerData(worker));

      result.setSuccess(true);
      result.setWorkersList(workersArray);
    } catch (ex) {
      var err = ex as Error;
      result.setSuccess(false);
      result.setMessage(err.message);
    }
    return result;
  }

  public async addOrUpdateWorker(workerData: WorkerData): Promise<Response> {
    const result = new Response();
    try {
      let workerExists: boolean = true;
      let worker: IWorker | null;
      worker = await Worker.findOne({
        workerId: workerData.getWorkerid(),
        archived: false,
      });

      if (isNil(worker)) {
        workerExists = false;
        worker = new Worker();
        worker.workerId = workerData.getWorkerid();
      }

      let dbWorker: IWorker;

      if (workerExists) {
        const propertiesForUpdate = this.UpdateWorkerProperties(
          worker,
          workerData
        );
        dbWorker = await Worker.updateOne(
          { _id: worker.id },
          propertiesForUpdate
        ).exec();
      } else {
        worker.active = workerData.getActive();
        worker.busy = workerData.getBusy();
        worker.archived = workerData.getArchived();
        dbWorker = await worker.save();
      }

      result.setSuccess(true);
      result.setId(dbWorker._id);
    } catch (ex) {
      var err = ex as Error;
      result.setSuccess(false);
      result.setMessage(err.message);
    }

    return result;
  }

  public async removeWorker(workerIdData: WorkerId): Promise<Response> {
    const result = new Response();
    try {
      const worker = await Worker.findOne({
        workerId: workerIdData.getWorkerid(),
        archived: false,
      });

      if (isNil(worker)) {
        throw new Error("Worker doesn't exist");
      }

      await Worker.updateOne({ _id: worker.id }, { archived: true }).exec();

      result.setSuccess(true);
      result.setMessage("Worker is deleted successfully.");
    } catch (ex) {
      var err = ex as Error;
      result.setSuccess(false);
      result.setMessage(err.message);
    }

    return result;
  }

  public async getWorkers(
    workerStatusData: WorkerStatus
  ): Promise<WorkersResponse> {
    const result = new WorkersResponse();

    try {
      const pagingData: Paging | undefined = workerStatusData.getPaging();
      let query: Object = {};
      let paging: Object = {};

      if (isBoolean(workerStatusData.getBusy())) {
        set(query, "busy", workerStatusData.getBusy());
      }

      if (isBoolean(workerStatusData.getActive())) {
        set(query, "active", workerStatusData.getActive());
      }

      if (!isUndefined(pagingData)) {
        if (!isUndefined(pagingData.getSkip())) {
          set(paging, "skip", pagingData.getSkip());
        }

        if (!isUndefined(pagingData.getTake())) {
          set(paging, "limit", pagingData.getTake());
        }

        if (!isUndefined(pagingData.getOrderby())) {
          set(paging, "sort", pagingData.getOrderby());
        }
      }

      const workers = await Worker.find(query, {}, paging).exec();

      result.setSuccess(true);
      result.setWorkersList(
        workers.map((worker) => {
          return this.DbWorkerToWorkerData(worker);
        })
      );
    } catch (ex) {
      var err = ex as Error;
      result.setSuccess(false);
      result.setMessage(err.message);
    }

    return result;
  }

  public async freeWorkersInRadius(
    radiusData: Radius
  ): Promise<WorkersResponse> {
    const result = new WorkersResponse();

    try {
      const location: GrpcLocation | undefined = radiusData.getLocation();

      if (isUndefined(location)) {
        throw new Error("Location is missing.");
      }

      let workers: IWorker[] | undefined = await Worker.find({
        busy: false,
        active: true,
      }).exec();

      // TODO : Fix filtering by location
      /*
      workers = workers.filter((worker) => {
        return isPointWithinRadius(
          {
            latitude: toNumber(worker.latitude),
            longitude: toNumber(worker.longitude),
          },
          {
            latitude: toNumber(location.getLatitude()),
            longitude: toNumber(location.getLongitude()),
          },
          radiusData.getRadius()
        );
      });
      */

      const pagingData: Paging | undefined = radiusData.getPaging();

      if (!isUndefined(pagingData)) {
        // TODO : Fix sorting workers
        /*if (!isUndefined(pagingData.getOrderby())) {
                    workers = workers.sort((worker1, worker2) => {
                        return 1;
                    })
                }*/

        if (
          !isUndefined(pagingData.getSkip()) &&
          !isUndefined(pagingData.getTake())
        ) {
          workers = workers.splice(
            pagingData.getSkip(),
            pagingData.getSkip() + pagingData.getTake()
          );
        }
      }

      result.setSuccess(true);
      result.setWorkersList(
        workers.map((worker) => {
          return this.DbWorkerToWorkerData(worker);
        })
      );

      return result;
    } catch (ex) {
      var err = ex as Error;
      result.setSuccess(false);
      result.setMessage(err.message);
    }

    return result;
  }

  public async updateWorkerStatus(statusData: Status): Promise<Response> {
    const result = new Response();

    try {
      const worker = await Worker.findOne({
        workerId: statusData.getWorkerid(),
      }).exec();
      if (isNull(worker)) {
        throw new Error(
          `Worker with id ${statusData.getWorkerid()} doesn't exist`
        );
      }

      let propertiesForUpdate = {};

      if (isBoolean(statusData.getBusy())) {
        set(propertiesForUpdate, "busy", statusData.getBusy());
      }

      if (isBoolean(statusData.getActive())) {
        set(propertiesForUpdate, "active", statusData.getActive());
      }

      if (isBoolean(statusData.getArchived())) {
        set(propertiesForUpdate, "archived", statusData.getArchived());
      }

      await Worker.updateOne({ _id: worker.id }, propertiesForUpdate).exec();

      result.setSuccess(true);
      result.setId(worker.workerId);
    } catch (ex) {
      var err = ex as Error;
      result.setSuccess(false);
      result.setMessage(err.message);
    }

    return result;
  }

  public async updateWorkerLocation(
    locationData: GrpcLocation
  ): Promise<Response> {
    const result = new Response();

    try {
      const worker = await Worker.findOne({
        workerId: locationData.getWorkerid(),
        archived: false,
      }).exec();
      if (isNull(worker)) {
        throw new Error(
          `Worker with id ${locationData.getWorkerid()} doesn't exist`
        );
      }

      if (
        !isUndefined(locationData.getLatitude()) &&
        !isUndefined(locationData.getLongitude())
      ) {
        let newLocation: ILocation = new Location();
        newLocation.workerId = worker.id.toString();
        newLocation.latitude = locationData.getLatitude();
        newLocation.longitude = locationData.getLongitude();

        if (worker.busy) {
          worker.location.push(newLocation);
        } else {
          if (worker.location.length == 0) {
            worker.location.push(newLocation);
          } else {
            worker.location[0] = newLocation;
          }
        }

        await worker.save();

        result.setSuccess(true);
        return result;
      }

      throw new Error(`Latitude or Longitude isn't defined.`);
    } catch (ex) {
      var err = ex as Error;
      result.setSuccess(false);
      result.setMessage(err.message);
    }

    return result;
  }

  public async getWorkerLocation(
    workerIdData: WorkerId
  ): Promise<LocationResult> {
    const result = new LocationResult();

    try {
      const worker = await Worker.findOne({
        workerId: workerIdData.getWorkerid(),
        archived: false,
      }).exec();
      if (isNull(worker)) {
        throw new Error(
          `Worker with id ${workerIdData.getWorkerid()} doesn't exist`
        );
      }

      const grpcLocationArray = worker.location.map((loc) => {
        return this.DbLocationToLocationData(loc);
      });

      result.setSuccess(true);
      result.setLocationList(grpcLocationArray);
    } catch (ex) {
      var err = ex as Error;
      result.setSuccess(false);
      result.setMessage(err.message);
    }

    return result;
  }

  public async hireWorker(hireWorker: HireWorkerRequest): Promise<Response> {
    const result = new Response();
    try {
      const worker = await Worker.findOne({
        workerId: hireWorker.getWorkerid(),
        archived: false,
        busy: false,
        active: true,
      });

      if (isNull(worker)) {
        throw new Error("Worker doesn't exist");
      }

      await Worker.updateOne(
        { _id: worker.id },
        {
          employer: hireWorker.getEmployerid(),
          busy: true,
        }
      ).exec();

      result.setSuccess(true);
      result.setMessage("Worker is deleted successfully.");
    } catch (ex) {
      var err = ex as Error;
      result.setSuccess(false);
      result.setMessage(err.message);
    }

    return result;
  }

  public async allWorkersForEmployer(
    employerId: EmployerId
  ): Promise<AllWorkersForEmployerResponse> {
    const result = new AllWorkersForEmployerResponse();
    try {
      const workers = await Worker.find({
        employer: employerId.getId(),
      });
      const hiredWorkers: Array<HiredWorker> = new Array<HiredWorker>();

      for (const worker of workers) {
        const workerData = this.DbWorkerToWorkerData(worker);

        const workerId = new WorkerId();
        workerId.setWorkerid(worker.workerId);
        const locationResult = await this.getWorkerLocation(workerId);

        if (!locationResult.getSuccess()) {
          throw new Error(locationResult.getMessage());
        }

        const hiredWorker: HiredWorker = new HiredWorker();
        hiredWorker.setData(workerData);
        hiredWorker.setLocationList(locationResult.getLocationList());

        hiredWorkers.push(hiredWorker);
      }

      result.setSuccess(true);
      result.setEmployerid(employerId.getId());
      result.setWorkersList(hiredWorkers);
    } catch (ex) {
      var err = ex as Error;
      result.setSuccess(false);
      result.setMessage(err.message);
    }

    return result;
  }

  private DbWorkerToWorkerData(worker: IWorker): WorkerData {
    const workerData: WorkerData = new WorkerData();
    workerData.setWorkerid(worker.workerId);
    workerData.setActive(worker.active);
    workerData.setBusy(worker.busy);
    workerData.setEmployerid(worker.employer);

    return workerData;
  }

  private UpdateWorkerProperties(
    worker: IWorker,
    workerData: WorkerData
  ): Object {
    let propertiesForUpdate = {};

    if (
      isBoolean(workerData.getBusy()) &&
      worker.busy !== workerData.getBusy()
    ) {
      set(propertiesForUpdate, "busy", workerData.getBusy());
    }

    if (
      isBoolean(workerData.getActive()) &&
      worker.active !== workerData.getActive()
    ) {
      set(propertiesForUpdate, "active", workerData.getActive());
    }

    if (
      isBoolean(workerData.getActive()) &&
      worker.archived !== workerData.getActive()
    ) {
      set(propertiesForUpdate, "archived", workerData.getActive());
    }

    if (
      isString(workerData.getEmployerid()) &&
      worker.employer !== workerData.getEmployerid()
    ) {
      set(propertiesForUpdate, "employer", workerData.getEmployerid());
    }

    return propertiesForUpdate;
  }

  private DbLocationToLocationData(location: ILocation): GrpcLocation {
    const grpcLocation: GrpcLocation = new GrpcLocation();
    grpcLocation.setWorkerid(location.workerId.toString());
    grpcLocation.setLongitude(location.longitude);
    grpcLocation.setLatitude(location.latitude);
    grpcLocation.setCreatedat(location.createAt);
    return grpcLocation;
  }
}
