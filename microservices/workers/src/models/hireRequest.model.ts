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
      type: Schema.Types.ObjectId,
    },
    employer: {
      required: true,
      type: Schema.Types.ObjectId,
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
