import { model, Schema, Document } from "mongoose";

export interface IUserDevice extends Document {
  userId: string;
  deviceToken: string;
}

const UserDevice: Schema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    deviceToken: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export default model<IUserDevice>("Devices", UserDevice);
