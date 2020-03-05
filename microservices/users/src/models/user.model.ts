import { model, Schema, Document } from 'mongoose';

export type AccessToken = {
    token: string,
    expired: boolean,
    expiration: string
}

export interface IUser extends Document {
  email: string;
  mobile: string;
  password: string;
  role: string;
  accessToken: AccessToken;
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
        token: {
            type: String,
            required: false
        },
        expired: {
            type: Boolean,
            required: false
        },
        expiration: {
            type: Date,
            required: false
        }
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

// Export the model and return your IUser interface
export default  model<IUser>('User', UserSchema);