import { model, Schema, Document } from 'mongoose';

export interface IWorker extends Document {
    workerId: string,
    busy: boolean,
    active: boolean,
    latitude: string,
    longitude: string
}

const WorkerSchema: Schema = new Schema({
    workerId: {
        required: true,
        type: String,
        unique: true
    },
    active: {
        required: true,
        type: Boolean,
        default: false
    },
    busy: {
        required: true,
        type: Boolean,
        default: false
    },
    latitude: {
        required: false,
        type: String
    },
    longitude: {
        required: false,
        type: String
    }
});

export default  model<IWorker>('Worker', WorkerSchema);