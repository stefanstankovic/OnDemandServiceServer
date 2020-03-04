import { model, Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  mobile: string;
  password: string;
  role: string;
  accessToken: string;
  createAt: string;
  updateAt: string;
}

const UserSchema: Schema = new Schema({
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    mobile: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "worker", "admin"]
    },
    accessToken: {
        type: String
    }
}, { 
    timestamps: { 
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

// Export the model and return your IUser interface
export default  model<IUser>('User', UserSchema);