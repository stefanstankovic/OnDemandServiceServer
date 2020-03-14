import * as jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../models/errors/unauthorized.error';
import { Request, Response, NextFunction } from 'express';
import { set } from 'lodash';
import { UserType } from '../models/user/user.model';

export type JwtAuthOptions = {
    secret : string,
    getToken: (req: Request) => string | null ,
    authRequest: boolean | null
}

export class JwtAuth {
    constructor(private options : JwtAuthOptions){
    }

    async authorize(req : Request, res: Response, next : NextFunction) {
        let token : string | null;
        try {
            token = this.options.getToken(req);
        } catch (ex) {
            return next(ex);
        }

        if (!token) {
            if (this.options.authRequest) {
                return next(new UnauthorizedError('credentials_required', 'No authorization token was found'));
            }

            return next();
        }

        let decoded : object | string;

        try {
            decoded = await jwt.verify(token, this.options.secret);
        } catch (ex) {
            let error = ex as Error;
            let unauthorizedError = new UnauthorizedError('invalid_token', error.message);
            unauthorizedError.stack = error.stack;

            return next(unauthorizedError);
        }

        set(req, 'user', decoded);
    }

    async sign(user: UserType) : Promise<string> {
        const token = await jwt.sign(user, this.options.secret);
        return token;
    }
}