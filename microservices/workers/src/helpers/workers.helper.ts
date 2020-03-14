
import {
    WorkerData,
    WorkerId,
    WorkerStatus,
    WorkersResponse,
    Response,
    Radius,
    Location,
    Status,
    Paging,
    LocationResult
} from '../grpc/_proto/workers/workers_pb';
import Worker, { IWorker } from '../models/worker.model';
import { isNull, isUndefined, set, toNumber } from 'lodash';
import { isPointWithinRadius } from 'geolib';

export class WorkersHelper {
    constructor(){}

    public async addOrUpdateWorker(workerData: WorkerData): Promise<Response> {
        const result = new Response();
        try {
            let workerExists: boolean = true;
            let worker : IWorker | null;
            worker = await Worker.findOne({workerId : workerData.getWorkerid()});

            if (isNull(worker)) {
                workerExists = false;
                worker = new Worker();
                worker.workerId = workerData.getWorkerid();
            }

            worker.busy = workerData.getBusy();
            worker.active = workerData.getActive();
            const location: Location | undefined = workerData.getLocation();

            if (!isUndefined(location)) {
                worker.latitude = location.getLatitude();
                worker.longitude = location.getLongitude();
            }

            let dbWorker: IWorker;

            if (workerExists) {
                dbWorker = await worker.update(worker._id).exec();
            } else {
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
            const worker = Worker.findOne({workerId : workerIdData.getWorkerid()});

            if (isNull(worker)) {
                throw new Error("Worker doesn't exist");
            }

            await worker.remove();

            result.setSuccess(true);
            result.setMessage("Worker is deleted successfully.");
        } catch (ex) {
            var err = ex as Error;
            result.setSuccess(false);
            result.setMessage(err.message);
        }

        return result;
    }

    public async getWorkers(workerStatusData: WorkerStatus): Promise<WorkersResponse> {
        const result = new WorkersResponse();

        try {
            const pagingData : Paging | undefined = workerStatusData.getPaging();
            let query: Object = {};
            let paging: Object = {};

            if (!isUndefined(workerStatusData.getBusy())) {
                set(query, "busy", workerStatusData.getBusy());
            }

            if (!isUndefined(workerStatusData.getActive())) {
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

    public async freeWorkersInRadius(radiusData: Radius): Promise<WorkersResponse> {
        const result = new WorkersResponse();

        try {
            const location :Location | undefined = radiusData.getLocation();

            if (isUndefined(location)) {
                throw new Error("Location is missing.");
            }

            let workers: IWorker[] | undefined = await Worker.find({busy: false, active: true}).exec();
            workers = workers.filter((worker) => {
                return isPointWithinRadius(
                    {
                        latitude: toNumber(worker.latitude),
                        longitude: toNumber(worker.longitude)
                    },
                    {
                        latitude: toNumber(location.getLatitude()),
                        longitude: toNumber(location.getLongitude())
                    },
                    radiusData.getRadius()
                );
            });

            const pagingData: Paging | undefined= radiusData.getPaging();

            if (!isUndefined(pagingData)) {
                // TODO : Fix sorting workers
                /*if (!isUndefined(pagingData.getOrderby())) {
                    workers = workers.sort((worker1, worker2) => {
                        return 1;
                    })
                }*/
    
                if (!isUndefined(pagingData.getSkip()) && !isUndefined(pagingData.getTake())) {
                    workers = workers.splice(pagingData.getSkip(), pagingData.getSkip() + pagingData.getTake());
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
            const worker = await Worker.findOne({ workerId: statusData.getWorkerid()}).exec();
            if (isNull(worker)) {
                throw new Error(`Worker with id ${statusData.getWorkerid()} doesn't exist`);
            }

            if (!isUndefined(statusData.getBusy())) {
                worker.busy = statusData.getBusy();
            }

            if (!isUndefined(statusData.getActive())) {
                worker.active = statusData.getActive();
            }

            await worker.update(worker._id).exec();

            result.setSuccess(true);
            result.setId(worker.workerId);
        } catch (ex) {
            var err = ex as Error;
            result.setSuccess(false);
            result.setMessage(err.message);
        }

        return result;
    }

    public async updateWorkerLocation(locationData: Location): Promise<Response> {
        const result = new Response();

        try {
            const worker = await Worker.findOne({ workerId: locationData.getWorkerid()}).exec();
            if (isNull(worker)) {
                throw new Error(`Worker with id ${locationData.getWorkerid()} doesn't exist`);
            }

            if (!isUndefined(locationData.getLatitude()) && !isUndefined(locationData.getLongitude())) {
                worker.latitude = locationData.getLatitude();
                worker.longitude = locationData.getLongitude();

                await worker.update(worker._id).exec();

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

    public async getWorkerLocation(workerIdData: WorkerId): Promise<LocationResult> {
        const result = new LocationResult();

        try {
            const worker = await Worker.findOne({ workerId: workerIdData.getWorkerid()}).exec();
            if (isNull(worker)) {
                throw new Error(`Worker with id ${workerIdData.getWorkerid()} doesn't exist`);
            }

            const location : Location = new Location();
            location.setWorkerid(worker.workerId);
            location.setLongitude(worker.longitude);
            location.setLatitude(worker.latitude);

            result.setSuccess(true);
            result.setLocation(location);

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

        const location: Location = new Location();
        location.setLatitude(worker.latitude);
        location.setLongitude(worker.longitude);
        location.setWorkerid(worker.workerId);

        workerData.setLocation(location);

        return workerData;
    }
}