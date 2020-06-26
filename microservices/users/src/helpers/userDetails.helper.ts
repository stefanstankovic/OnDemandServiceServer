import {
  UserDetails as GrpcUserDetails,
  Response,
  UpdateUserDetailsRequest,
  UserDetailsResponse,
  Id,
} from "../grpc/_proto/user/user_pb";
import UserDetails, { IUserDetails } from "../models/userDetails.model";
import User from "../models/user.model";
import UserHelper from "./user.helper";
import { isString } from "util";

class UserDetailsHelper {
  constructor() { }

  public async AddUserDetails(
    userDetailsData: GrpcUserDetails
  ): Promise<Response> {
    let result = new Response();

    if (!userDetailsData.getUser() || !userDetailsData.getUser()?.getId()) {
      result.setMessage("UserId can't be empty");
      result.setSuccess(false);

      return result;
    }

    let user = await User.findById(userDetailsData.getUser()?.getId());

    if (!user) {
      result.setMessage(
        `User with ${userDetailsData.getUser()?.getId} doesn't exist.`
      );
      result.setSuccess(false);

      return result;
    }

    let newUserdetails: IUserDetails = new UserDetails({
      firstName: userDetailsData.getFirstname(),
      lastName: userDetailsData.getLastname(),
      birthday: userDetailsData.getBirthday(),
      user: user,
    });

    try {
      var userDetails = newUserdetails.save();
      result.setId((await userDetails)._id);
      result.setSuccess(true);
    } catch (ex) {
      result.setSuccess(false);
      result.setMessage((ex as Error).message);
    }

    return result;
  }

  public async UpdateUserDetails(
    userDetailsData: UpdateUserDetailsRequest
  ): Promise<UserDetailsResponse> {
    let result = new UserDetailsResponse();

    let userDetails = await UserDetails.findById(userDetailsData.getId());

    if (!userDetails) {
      result.setSuccess(false);
      result.setMessage(
        `User details with id ${userDetailsData.getId()} doesn't exist.`
      );

      return result;
    }

    userDetails = this.UpdateUserDetailsProperties(
      userDetails,
      userDetailsData
    );
    try {
      await userDetails.update(userDetails._id).exec();
      result.setSuccess(true);
      result.setData(await this.UserDetailsFromDbUserDetails(userDetails));
    } catch (ex) {
      result.setSuccess(false);
      result.setMessage((ex as Error).message);
    }

    return result;
  }

  public async FindUserDetailsByUserId(
    idData: Id
  ): Promise<UserDetailsResponse> {
    let result = new UserDetailsResponse();

    let userDetails = await UserDetails.findOne({ user: idData.getId() });

    if (!userDetails) {
      result.setMessage(
        `User details for user ${idData.getId()} doens't exist!`
      );
      result.setSuccess(false);

      return result;
    }

    result.setData(await this.UserDetailsFromDbUserDetails(userDetails));
    result.setSuccess(true);

    return result;
  }

  private UpdateUserDetailsProperties(
    userDetails: IUserDetails,
    userDetailsDeta: UpdateUserDetailsRequest
  ): IUserDetails {
    if (isString(userDetailsDeta.getData()?.getFirstname())) {
      userDetails.firstName = userDetailsDeta
        .getData()
        ?.getFirstname() as string;
    }

    if (isString(userDetailsDeta.getData()?.getLastname())) {
      userDetails.lastName = userDetailsDeta.getData()?.getLastname() as string;
    }

    if (isString(userDetailsDeta.getData()?.getBirthday())) {
      userDetails.birthday = userDetailsDeta.getData()?.getBirthday() as string;
    }

    return userDetails;
  }

  private async UserDetailsFromDbUserDetails(
    userDetails: IUserDetails
  ): Promise<GrpcUserDetails> {
    let userDetailsData = new GrpcUserDetails();
    userDetailsData.setId(userDetails._id);
    userDetailsData.setFirstname(userDetails.firstName);
    userDetailsData.setLastname(userDetails.lastName);
    userDetailsData.setBirthday(userDetails.birthday);
    userDetailsData.setCreateat(userDetails.createAt);
    userDetailsData.setUpdateat(userDetails.updateAt);

    const userId = new Id();
    userId.setId(userDetails.id);

    let userResponse = await UserHelper.FindUserById(userId);
    if (userResponse.getSuccess()) {
      userDetailsData.setUser(userResponse.getData());
    }

    return userDetailsData;
  }
}

export default new UserDetailsHelper();
