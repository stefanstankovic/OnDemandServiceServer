import { model, Schema, Document } from 'mongoose';

export interface INotification extends Document {
    userId: string,
    type: string,
    data: object;
    delivered: boolean;
    stringData: string;
}

const NotificationSchema: Schema = new Schema({
    userId: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        required: false
    },
    delivered: {
        type: Boolean,
        default: false,
        require: true
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

export default model<INotification>('Notification', NotificationSchema);