import { model, Schema, Document } from "mongoose";

export interface IWorker extends Document {
  workerId: string;
  busy: boolean;
  active: boolean;
  archived: boolean;
  employer: string;
  createAt: string;
  updateAt: string;
}

const WorkerSchema: Schema = new Schema(
  {
    workerId: {
      required: true,
      type: String,
      unique: true,
    },
    active: {
      required: true,
      type: Boolean,
      default: false,
    },
    busy: {
      required: true,
      type: Boolean,
      default: false,
    },
    archived: {
      required: true,
      type: Boolean,
      default: false,
    },
    employer: {
      required: false,
      type: Schema.Types.ObjectId,
    },
    location: [
      {
        latitude: String,
        longitude: String,
      },
    ],
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "createdAt",
    },
  }
);

export default model<IWorker>("Worker", WorkerSchema);
