import { User } from './models/user/user.model';

declare namespace Express {
    export interface Request {
        user?: User;
        session? : object;
    }
}