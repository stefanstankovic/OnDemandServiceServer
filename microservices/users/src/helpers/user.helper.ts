import {
  UserData,
  Response,
  UpdateUserRequest,
  UserDataResponse,
  Id,
  Login,
  FindUsersResponse,
  Query,
  AccessToken as GrpcAccessToken,
} from "../grpc/_proto/user/user_pb";
import User, { IUser, AccessToken } from "../models/user.model";
import { isString, isObject, isBoolean, isEmpty, set } from "lodash";
import { hash, compare } from "bcrypt";

class UserHelper {
  private readonly _saltRound: number = 10;

  constructor() { }

  public async AddUser(userData: UserData): Promise<Response> {
    let passwordHash = await hash(userData.getPassword(), this._saltRound);
    let newUser: IUser = new User({
      email: userData.getEmail(),
      mobile: userData.getMobile(),
      password: passwordHash,
      role: userData.getRole(),
      accessToken: userData.getAccesstoken(),
    });

    let result = new Response();

    try {
      var user = await newUser.save();
      result.setId(user.id);
      result.setSuccess(true);
    } catch (ex) {
      result.setSuccess(false);
      result.setMessage((ex as Error).message);
    }

    return result;
  }

  public async UpdateUser(
    userRequestData: UpdateUserRequest
  ): Promise<UserDataResponse> {
    let user = await User.findById(userRequestData.getId());
    let result = new UserDataResponse();

    if (!user) {
      result.setSuccess(false);
      result.setMessage(`User with ${userRequestData.getId()} doesn't exist`);
      return result;
    }

    if (!userRequestData.getData()) {
      result.setSuccess(false);
      result.setMessage(`Data doesn't exist`);
      return result;
    }

    try {
      let updateProperties = await this.UpdateUserProperties(user, userRequestData);
      await User.updateOne({ _id: user.id }, updateProperties);
      result.setSuccess(true);
      result.setData(this.UserDataFromDbUser(user));
    } catch (ex) {
      result.setSuccess(false);
      result.setMessage((ex as Error).message);
    }

    return result;
  }

  public async FindUserById(idData: Id): Promise<UserDataResponse> {
    let result = new UserDataResponse();

    try {
      let user = await User.findById(idData.getId());

      if (!user) {
        throw new Error(`User with ${idData.getId()} doesn't exist`);
      }

      result.setSuccess(true);
      result.setData(this.UserDataFromDbUser(user));
    } catch (ex) {
      result.setSuccess(false);
      result.setMessage((ex as Error).message);
    }

    return result;
  }

  public async FindUsers(query: Query): Promise<FindUsersResponse> {
    let result = new FindUsersResponse();
    try {
      //let where = JSON.parse(query.getWhere());

      result.setSuccess(true);
    } catch (ex) {
      const err = ex as Error;

      result.setSuccess(false);
      result.setMessage(err.message);
    }
    return result;
  }

  public async ValidateLogin(loginData: Login): Promise<UserDataResponse> {
    let result = new UserDataResponse();

    try {
      let user = await User.findOne({ email: loginData.getEmail() });
      if (!user) {
        throw new Error(
          `User with email ${loginData.getEmail()} doesn't exist`
        );
      }

      let samePassword = await compare(loginData.getPassword(), user.password);

      if (samePassword) {
        result.setSuccess(true);
        result.setData(this.UserDataFromDbUser(user));
        return result;
      }

      result.setSuccess(false);
      result.setMessage("Wrong password!");
      return result;
    } catch (ex) {
      const err = ex as Error;

      result.setSuccess(false);
      result.setMessage(err.message);
      return result;
    }
  }

  private async UpdateUserProperties(
    user: IUser,
    userRequestData: UpdateUserRequest
  ): Promise<object> {
    const userData: UserData | undefined = userRequestData.getData();

    if (!userData) {
      throw new Error("User data doesn't exist");
    }

    let propertiesForUpdate = {}

    if (isString(userData.getEmail())
      && !isEmpty(userData.getEmail())
      && userData.getEmail() !== user.email) {
      set(propertiesForUpdate, 'email', userData?.getEmail() as string);
    }

    if (isString(userData.getMobile())
      && !isEmpty(userData.getMobile())
      && userData.getMobile() !== user.mobile) {
      set(propertiesForUpdate, 'mobile', user.mobile = userData.getMobile() as string);
    }

    if (isString(userData.getPassword())
      && !isEmpty(userData.getPassword())) {
      let passwordHash = await hash(userData.getPassword(), this._saltRound);
      set(propertiesForUpdate, 'password', passwordHash);
    }

    if (isString(userData.getRole())
      && !isEmpty(userData.getRole())
      && userData.getRole() !== user.role) {
      set(propertiesForUpdate, 'password', user.role = userData.getRole() as string);
    }

    const grpcAcessToken:
      | GrpcAccessToken
      | undefined = userData.getAccesstoken();
    if (grpcAcessToken && isObject(userData.getAccesstoken())) {
      let accessToken: AccessToken = user.accessToken;
      let accessTokenForUpdate = {};
      let tokenUpdated = false
      if (
        grpcAcessToken.getExpiration()
        && isString(grpcAcessToken.getExpiration())
        && !isEmpty(grpcAcessToken.getExpiration())
        && grpcAcessToken.getExpiration() != accessToken.expiration
      ) {
        set(accessTokenForUpdate, 'expiration', grpcAcessToken.getExpiration());
        tokenUpdated = true;
      }

      if (
        grpcAcessToken.getExpired() &&
        isBoolean(grpcAcessToken.getExpired())
      ) {
        set(accessTokenForUpdate, 'expiration', grpcAcessToken.getExpired());
        tokenUpdated = true;
      }

      if (grpcAcessToken.getToken()
        && isString(grpcAcessToken.getToken())
        && !isEmpty(grpcAcessToken.getToken())
        && grpcAcessToken.getToken() != accessToken.token) {
        set(accessTokenForUpdate, 'expiration', grpcAcessToken.getToken());
        tokenUpdated = true;
      }

      if (tokenUpdated) {
        set(propertiesForUpdate, 'accessToken', accessToken);
      }
    }

    return propertiesForUpdate;
  }

  private UserDataFromDbUser(user: IUser): UserData {
    let userData = new UserData();
    userData.setId(user.id);
    userData.setEmail(user.email);
    userData.setMobile(user.mobile);
    userData.setPassword(user.password);
    userData.setRole(user.role);
    userData.setCreateat(user.createAt);
    userData.setUpdateat(user.updateAt);
    if (user.accessToken) {
      const grpcAccessToken: GrpcAccessToken = new GrpcAccessToken();
      grpcAccessToken.setExpiration(user.accessToken.expiration);
      grpcAccessToken.setExpired(user.accessToken.expired);
      grpcAccessToken.setToken(user.accessToken.token);

      userData.setAccesstoken(grpcAccessToken);
    }

    return userData;
  }
}

export default new UserHelper();
