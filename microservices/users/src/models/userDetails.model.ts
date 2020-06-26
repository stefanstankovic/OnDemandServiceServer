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
    },
    lastName: {
      type: String,
    },
    birthday: {
      type: Date,
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
