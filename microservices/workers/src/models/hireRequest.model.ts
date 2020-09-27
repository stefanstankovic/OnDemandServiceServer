import { model, Schema, Document } from "mongoose";

export interface IHireRequest extends Document {
  workerId: string;
  employer: string;
  status: string;
  requestMessage: string;
}

const HireRequest: Schema = new Schema(
  {
    workerId: {
      required: true,
      type: String,
    },
    employer: {
      required: true,
      type: String,
    },
    status: {
      required: true,
      type: String,
    },
    requestMessage: {
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

export default model<IHireRequest>("HireRequest", HireRequest);
