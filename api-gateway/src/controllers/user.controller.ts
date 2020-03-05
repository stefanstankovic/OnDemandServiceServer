import {RequestHandler} from 'express';
import { User, UserType } from '../models/user.model';
import { Response } from '../grpc/_proto/user/user_pb';
import { ServiceRegistry } from '../services/service.registry';

export const singUp : RequestHandler = async (req, res, next) => {

    const userBody : UserType = req.body.user as UserType;
    var user = new User(
        userBody.email,
        userBody.mobile,
        userBody.password,
        userBody.role
        );

    const response : Response =
        await ServiceRegistry
            .getInstance()
            .services
            .userService
            .addUser(user.grpcUserData);
    if (!response.getSuccess()) {
        res.status(400).json({success : false, message: response.getMessage()});
    }

    user.id = response.getId();

    res.status(201).json({success: true, user: user });
}