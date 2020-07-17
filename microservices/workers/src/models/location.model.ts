import { model, Schema, Document } from "mongoose";
import { IWorker } from "./worker.model";

export interface ILocation extends Document {
  workerId: IWorker["_id"];
  latitude: string;
  longitude: string;
  createAt: string;
}

const LocationSchema: Schema = new Schema(
  {
    workerId: {
      required: true,
      type: Schema.Types.ObjectId,
    },
    latitude: {
      required: true,
      type: String,
    },
    longitude: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
    },
  }
);

export default model<ILocation>("Location", LocationSchema);
