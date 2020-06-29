import { WorkerData } from "../../grpc/_proto/workers/workers_pb";
import { LocationType, Location } from "./location.model";
import { isNull, isNil } from "lodash";

export type WorkerType = {
  workerId: string;
  busy: boolean;
  active: boolean;
  archived: boolean;
};

export class Worker {
  constructor(
    private _workerId: string | null = null,
    private _busy: boolean | null = null,
    private _active: boolean | null = null,
    private _archived: boolean | null = null,
    private _location: LocationType | null = null
  ) {}

  get grpsWorker(): WorkerData {
    const worker = new WorkerData();
    worker.setWorkerid(this._workerId!);
    worker.setBusy(this._busy!);
    worker.setActive(this._active!);
    worker.setArchived(this._archived!);

    return worker;
  }

  set grpsWorker(worker: WorkerData) {
    this._workerId = worker.getWorkerid();
    this._busy = worker.getBusy();
    this._active = worker.getActive();
    this._archived = worker.getArchived();
  }

  get workerObject(): WorkerType {
    return {
      workerId: this._workerId!,
      busy: this._busy!,
      active: this._active!,
      archived: this._archived!,
    };
  }

  set workerObject(workerObject: WorkerType) {
    this._workerId = workerObject.workerId;
    this._active = workerObject.active;
    this._busy = workerObject.busy;
    this._archived = workerObject.archived;
  }
}
