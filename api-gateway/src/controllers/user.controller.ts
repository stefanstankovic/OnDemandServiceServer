import { RequestHandler, Request } from "express";

import { Login, LoginType } from "../models/user/login.model";
import { User, UserType } from "../models/user/user.model";
import { UserDetails } from "../models/user/userDetails.model";

import { Response, UserDataResponse } from "../grpc/_proto/user/user_pb";

import { ServiceRegistry } from "../services/service.registry";
import { Events } from "../hooks/event.types/event.types";
import { JwtAuth } from "../utils/auth";

import { isUndefined } from "lodash";

const jwtAuth = new JwtAuth({
  secret: !isUndefined(process.env.JWT_SECRET)
    ? process.env.JWT_SECRET
    : "aaaabbbbccc123",
  getToken: (req: Request): string | null => {
    return null;
  },
  authRequest: null,
});

export const singUp: RequestHandler = async (req, res, next) => {
  const userBody: UserType = req.body as UserType;

  if (
    isUndefined(userBody) ||
    isUndefined(userBody.email) ||
    isUndefined(userBody.password) ||
    isUndefined(userBody.mobile) ||
    isUndefined(userBody.role) ||
    userBody.password.length < 8
  ) {
    res.status(400).json({ success: false, message: "Invalid input." });
    return next();
  }

  let user = new User();
  user.userObject = userBody;

  // create user
  const response: Response = await ServiceRegistry.getInstance().services.userClient.addUser(
    user.grpcUserData
  );
  if (!response.getSuccess()) {
    res.status(400).json({ success: false, message: response.getMessage() });
    return next();
  }

  user.id = response.getId();
  //delete user.password;

  let token: string;
  try {
    token = await jwtAuth.sign(user.userObject);
  } catch (ex) {
    const err = ex as Error;
    res.status(400).json({ success: false, message: err.message });
    return next();
  }

  try {
    const userDetails = new UserDetails("", "", "", "", user.userObject);
    var responseDetail: Response = await ServiceRegistry.getInstance().services.userClient.addUserDetails(
      userDetails.grpcUserDetails
    );

    if (!responseDetail.getSuccess()) {
      throw new Error(response.getMessage());
    }
  } catch (ex) {
    const err = ex as Error;
    res.status(400).json({ success: false, message: err.message });
    return next();
  }

  // fire the user sign up event
  ServiceRegistry.getInstance().services.eventsBus.emit(
    Events.userSignUp,
    user.userObject,
    token
  );

  res.status(201).json({ success: true, user: user, token: token });
};

export const login: RequestHandler = async (req, res, next) => {
  const loginBody: LoginType = req.body as LoginType;
  let login: Login = new Login(loginBody.email, loginBody.password);

  const response: UserDataResponse = await ServiceRegistry.getInstance().services.userClient.validateLogin(
    login.grpcLogin
  );

  if (!response.getSuccess()) {
    res.status(400).json({ success: false, message: response.getMessage() });
    return next();
  }

  const user = new User();
  user.grpcUserData = response.getData()!;

  //delete user.password;
  let token: string;
  try {
    token = await jwtAuth.sign(user.userObject);
  } catch (ex) {
    const err = ex as Error;
    res.status(400).json({ success: false, message: err.message });
    return next();
  }
  // fire the user log in event
  ServiceRegistry.getInstance().services.eventsBus.emit(
    Events.userLogIn,
    user.userObject,
    token
  );

  res.status(201).json({ success: true, user: user.userObject, token: token });
};

export const updateUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const userBody: UserType = req.body as UserType;

  if (isUndefined(id)) {
    res.status(400).json({ success: false, message: "User ID is required!" });
    return next();
  }

  const user = new User();
  user.userObject = userBody;

  var userResponse: UserDataResponse = await ServiceRegistry.getInstance().services.userClient.updateUser(
    id,
    user.grpcUserData
  );

  if (!userResponse.getSuccess()) {
    res
      .status(400)
      .json({ success: false, message: userResponse.getMessage() });
    return next();
  }

  var updatedUser = new User();
  updatedUser.grpcUserData = userResponse.getData()!;

  res.status(201).json({ success: true, user: updatedUser.userObject });
};

export const logout: RequestHandler = async (req, res, next) => {
  // @ts-ignore
  const userId = req.user.id;
  const { deviceId } = req.body;

  try {
    ServiceRegistry.getInstance().services.eventsBus.emit(Events.userLogout, {
      userId,
      deviceId,
    });
  } catch {}

  res.status(201).json({ success: true });
};
