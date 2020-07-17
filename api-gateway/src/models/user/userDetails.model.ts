import {
  UserDetails as GrpsUserDetails,
  UserData as GrpcUserData,
} from "../../grpc/_proto/user/user_pb";

import { User, UserType } from "./user.model";
import { isNil } from "lodash";

export type UserDetailType = {
  id: string;
  firstName: string;
  lastName: string;
  birthday: string;
  user: UserType | undefined;
};

export class UserDetails {
  constructor(
    public id: string = "",
    public firstName: string = "",
    public lastName: string = "",
    public birthday: string = "",
    public user: UserType | undefined = undefined
  ) {}

  get grpcUserDetails() {
    const userDetails: GrpsUserDetails = new GrpsUserDetails();
    userDetails.setId(this.id);
    userDetails.setFirstname(this.firstName);
    userDetails.setLastname(this.lastName);
    userDetails.setBirthday(this.birthday);
    if (this.user) {
      const userModel = new User();
      userModel.userObject = this.user;
      userDetails.setUser(userModel.grpcUserData);
    }

    return userDetails;
  }

  set grpcUserDetails(userDetails: GrpsUserDetails) {
    this.id = userDetails.getId();
    this.firstName = userDetails.getFirstname();
    this.lastName = userDetails.getLastname();
    this.birthday = userDetails.getBirthday();

    if (!isNil(userDetails.getUser())) {
      const userModel = new User();
      userModel.grpcUserData = userDetails.getUser()!;
      this.user = userModel.userObject;
    }
  }

  get userDetailsObject(): UserDetailType {
    let userData = {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      birthday: this.birthday,
      user: !isNil(this.user) ? this.user : undefined,
    };

    return userData;
  }

  set userDetailsObject(userDetail: UserDetailType) {
    this.id = userDetail.id;
    this.firstName = userDetail.firstName;
    this.lastName = userDetail.lastName;
    this.birthday = userDetail.birthday;
    if (userDetail.user) {
      this.user = userDetail.user;
    }
  }
}
