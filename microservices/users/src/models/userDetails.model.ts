import { model, Schema, Document } from "mongoose";
import { IUser } from "./user.model";

export interface IUserDetails extends Document {
  firstName: string;
  lastName: string;
  birthday: string;
  createAt: string;
  updateAt: string;
  user: IUser["_id"];
}

const UserDetails: Schema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    birthday: {
      type: Date,
      required: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "createdAt",
    },
  }
);

export default model<IUserDetails>("UserDetails", UserDetails);
