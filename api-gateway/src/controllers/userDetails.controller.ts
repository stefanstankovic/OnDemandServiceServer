import { RequestHandler } from "express";

import { UserDetails, UserDetailType } from "../models/user/userDetails.model";

import { UserDetailsResponse } from "../grpc/_proto/user/user_pb";

import { ServiceRegistry } from "../services/service.registry";

import { isNil } from "lodash";

export const getDetails: RequestHandler = async (req, res, next) => {
  const { userId } = req.params;
  const response: UserDetailsResponse = await ServiceRegistry.getInstance().services.userClient.findUserDetailsByUserId(
    userId
  );

  if (!response.getSuccess()) {
    res.status(400).json({ success: false, message: response.getMessage() });
    return next();
  }

  const userDetails = new UserDetails();
  if (!isNil(response.getData())) {
    userDetails.grpcUserDetails = response.getData()!;
  }

  res
    .status(201)
    .json({ success: true, userDetails: userDetails.userDetailsObject });
};

export const updateDetails: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const userDetailsBody: UserDetailType = req.body as UserDetailType;
  const userDetails: UserDetails = new UserDetails();
  userDetails.userDetailsObject = userDetailsBody;

  const response: UserDetailsResponse = await ServiceRegistry.getInstance().services.userClient.updateUserDetails(
    id,
    userDetails.grpcUserDetails
  );

  if (!response.getSuccess()) {
    res.status(400).json({ success: false, message: response.getMessage() });
    return next();
  }

  const updatedUserDetails = new UserDetails();
  if (!isNil(response.getData())) {
    updatedUserDetails.grpcUserDetails = response.getData()!;
  }

  res
    .status(201)
    .json({ success: true, userDetails: updatedUserDetails.userDetailsObject });
};
