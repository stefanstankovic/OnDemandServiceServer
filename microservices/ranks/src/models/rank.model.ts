import { model, Schema, Document } from 'mongoose';

export interface IRank extends Document {
    userId: string;
    type: string;
    stars: number;
    comment: string;
}

const RankSchema : Schema = new Schema({
    userId: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    stars: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: false,
        default: ""
    }
});

export default model<IRank>('Rank', RankSchema);