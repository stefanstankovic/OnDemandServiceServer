import {
    UserData,
    Response,
    UpdateUserRequest,
    UserDataResponse,
    Id,
    Login,
    AccessToken as GrpcAccessToken
} from '../grpc/_proto/user/user_pb';
import User, { IUser, AccessToken } from '../models/user.model';
import { isString, isObject, isBoolean } from 'lodash';
import { hash, compare } from 'bcrypt';

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
            accessToken: userData.getAccesstoken()
        });

        let result = new Response();

        try {
            var user = await newUser.save();
            result.setId(user.id);
            result.setSuccess(true);
        } catch (ex) {
            result.setSuccess(false);
            result.setMessage((ex as Error).message)
        }

        return result;
    }

    public async UpdateUser(userRequestData: UpdateUserRequest): Promise<UserDataResponse> {
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
            user = this.UpdateUserProperties(user, userRequestData);
            await user.update(user._id).exec();
            result.setSuccess(true);
            result.setData(this.UserDataFromDbUser(user));
        } catch (ex) {
            result.setSuccess(false);
            result.setMessage((ex as Error).message)
        }

        return result;
    }

    public async FindUserById(idData: Id): Promise<UserDataResponse> {
        let result = new UserDataResponse();
        let user = await User.findById(idData.getId());

        if (!user) {
            result.setSuccess(false);
            result.setMessage(`User with ${idData.getId()} doesn't exist`);

            return result;
        }

        result.setData(this.UserDataFromDbUser(user));
        return result;
    }

    public async ValidateLogin(loginData: Login): Promise<UserDataResponse> {
        let result = new UserDataResponse();

        try {
            let user = await User.findOne({ email: loginData.getEmail() });
            if (!user) {
                throw new Error(`User with email ${loginData.getEmail()} doesn't exist`);
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

    private UpdateUserProperties(user: IUser, userRequestData: UpdateUserRequest): IUser {

        const userData: UserData | undefined = userRequestData.getData();

        if (!userData) {
            throw new Error("User data doesn't exist");
        }

        if (isString(userData.getEmail())) {
            user.email = userData?.getEmail() as string;
        }

        if (isString(userData.getMobile())) {
            user.mobile = userData.getMobile() as string;
        }

        if (isString(userData.getPassword())) {
            user.password = userData.getPassword() as string;
        }

        if (isString(userData.getRole())) {
            user.role = userData.getRole() as string;
        }

        const grpcAcessToken: GrpcAccessToken | undefined = userData.getAccesstoken();
        if (grpcAcessToken && isObject(userData.getAccesstoken())) {
            let accessToken: AccessToken = user.accessToken;
            if (grpcAcessToken.getExpiration() && isString(grpcAcessToken.getExpiration())) {
                accessToken.expiration = grpcAcessToken.getExpiration();
            }

            if (grpcAcessToken.getExpired() && isBoolean(grpcAcessToken.getExpired())) {
                accessToken.expired = grpcAcessToken.getExpired();
            }

            if (grpcAcessToken.getToken() && isString(grpcAcessToken.getToken())) {
                accessToken.token = grpcAcessToken.getToken();
            }

            user.accessToken = accessToken;
        }

        return user;
    }

    private UserDataFromDbUser(user: IUser): UserData {
        let userData = new UserData();
        userData.setId(user.id);
        userData.setEmail(user.email);
        userData.setPassword(user.password);
        userData.setRole(user.role);
        userData.setCreateat(user.createAt);
        userData.setUpdateat(user.updateAt);

        const grpcAccessToken: GrpcAccessToken = new GrpcAccessToken();
        grpcAccessToken.setExpiration(user?.accessToken?.expiration);
        grpcAccessToken.setExpired(user?.accessToken?.expired);
        grpcAccessToken.setToken(user?.accessToken?.token);

        userData.setAccesstoken(grpcAccessToken);

        return userData;
    }
}

export default new UserHelper();