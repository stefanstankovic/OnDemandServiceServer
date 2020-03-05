import { User } from '../src/models/user.model';

declare namespace Express {
    export interface Request {
        user?: User;
        session? : object;
    }
}