import { model, Schema, Document } from 'mongoose';
import { IUser } from './user.model';

export interface IWorkerOptions extends Document {
    busy: boolean;
    readius: number;
    createAt: string;
    updateAt: string;
    user: IUser['_id'];
}

const WorkerOptions: Schema = new Schema({
    busy: {
        type: Boolean,
        required: true,
        default: false
    },
    readius: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true
    }
}, { 
    timestamps: { 
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

export default model<IWorkerOptions>('WorkerOptions', WorkerOptions);