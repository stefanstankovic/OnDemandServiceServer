import { model, Schema, Document } from "mongoose";
import Location, { ILocation } from "./location.model";

export interface IWorker extends Document {
  workerId: string;
  busy: boolean;
  active: boolean;
  archived: boolean;
  employer: string;
  location: Array<ILocation>;
  createAt: string;
  updateAt: string;
}

const WorkerSchema: Schema = new Schema(
  {
    workerId: {
      required: true,
      type: String,
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
      type: String,
    },
    location: {
      type: [Location.schema],
      default: [],
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "createdAt",
    },
  }
);

export default model<IWorker>("Worker", WorkerSchema);
