import {isString} from 'lodash';
import { Response, NextFunction, Request} from 'express';

// TODO include middleware in app
export const authorizationMiddleware = (roles: string|Array<string>) => {
    if (isString(roles)){
        roles = [roles];
    }

    return (req : Request, res : Response, next : NextFunction) : any=> {
        // @ts-ignore
        if (!req.user || (req.user && roles.length && !roles.includes(req.user.role))) {
            // user's role is not authorized
            return res.status(401).json({ message: 'Unauthorized' });
        }

        next();
    }
}