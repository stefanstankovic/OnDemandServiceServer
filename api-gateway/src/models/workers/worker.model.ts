import { WorkerData} from '../../grpc/_proto/workers/workers_pb';
import { LocationType, Location } from './location.model';
import { isNull, isNil } from 'lodash';

export type WorkerType = {
    workerId: string,
    busy: boolean,
    active: boolean,
    location: LocationType | null
}

export class Worker {
    constructor(
        private _workerId: string | null = null,
        private _busy: boolean | null = null,
        private _active: boolean | null = null,
        private _location: LocationType | null = null
    ) {
    }

    get grpsWorker(): WorkerData {
        const worker = new WorkerData();
        worker.setWorkerid(this._workerId!);
        worker.setBusy(this._busy!);
        worker.setActive(this._active!);

        if (!isNull(this._location)) {
            const location = new Location();
            location.locationObjet = this._location;
            worker.setLocation(location.grpcLocation);
        }

        return worker;
    }

    set grpsWorker(worker: WorkerData) {
        this._workerId = worker.getWorkerid();
        this._busy = worker.getBusy();
        this._active = worker.getActive();

        if (!isNil(worker.getLocation())) {
            const location = new Location();
            location.grpcLocation = worker.getLocation()!;
            this._location = location.locationObjet;
        }
    }

    get workerObject(): WorkerType {
        return {
            workerId: this._workerId!,
            busy: this._busy!,
            active: this._active!,
            location: this._location
        }
    }

    set workerObject(workerObject: WorkerType) {
        this._workerId = workerObject.workerId;
        this._active = workerObject.active;
        this._busy = workerObject.busy;
        this._location = workerObject.location;
    }
}