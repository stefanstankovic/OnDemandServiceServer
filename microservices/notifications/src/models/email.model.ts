import { model, Schema, Document } from 'mongoose';


export interface IEmail extends Document {
    email: string;
    type: string;
    data: object;
    attempt: number;
    delivered: boolean;
    stringData: string;
}

const EmailSchema: Schema = new Schema({
    email: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    attempt: {
        type: Number,
        default: 0
    },
    delivered: {
        type: Boolean,
        default: false,
        require: true
    },
    data: {
        type: Object,
        required: false
    },
    stringData: {
        type: String,
        required: false
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

export default model<IEmail>('Email', EmailSchema);