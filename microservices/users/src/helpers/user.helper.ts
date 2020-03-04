import { UserData, Response, UpdateUserRequest, UserDataResponse, Id, Login } from '../grpc/_proto/user/user_pb';
import User, { IUser } from '../models/user.model';
import { isString } from 'util';

class UserHelper {
    constructor(){}
    
    public async AddUser(userData : UserData): Promise<Response> {
        let newUser : IUser = new User({
            email: userData.getEmail(),
            mobile: userData.getMobile(),
            password: userData.getPassword(),
            role: userData.getRole(),
            accessToken: userData.getAccesstoken()
        });

        let result =  new Response();

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

    public async UpdateUser(userRequestData: UpdateUserRequest) : Promise<UserDataResponse> {
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

        user = this.UpdateUserProperties(user, userRequestData);
        try {
            await user.update(user._id);
            result.setSuccess(true);
            result.setData(this.UserDataFromDbUser(user));
        } catch (ex) {
            result.setSuccess(false);
            result.setMessage((ex as Error).message)
        }

        return result;
    }

    public async FindUserById(idData: Id) : Promise<UserDataResponse> {
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

    public async ValidateLogin(loginData : Login) : Promise<Response> {
        let result =  new Response();

        let user = await User.findOne({email : loginData.getEmail(), password: loginData.getPassword()});

        if (!user) {
            result.setSuccess(false);
            
            return result;
        }

        result.setSuccess(true);

        return result;
    }

    private UpdateUserProperties(user: IUser, userRequestData: UpdateUserRequest) : IUser {
        if (isString(userRequestData.getData()?.getEmail()))
        {
            user.email = userRequestData.getData()?.getEmail() as string;
        }

        if (isString(userRequestData.getData()?.getMobile()))
        {
            user.mobile = userRequestData.getData()?.getMobile() as string;
        }

        if (isString(userRequestData.getData()?.getPassword()))
        {
            user.password = userRequestData.getData()?.getPassword() as string;
        }
        
        if (isString(userRequestData.getData()?.getRole()))
        {
            user.role = userRequestData.getData()?.getRole() as string;
        }

        if (isString(userRequestData.getData()?.getAccesstoken()))
        {
            user.accessToken = userRequestData.getData()?.getAccesstoken() as string;
        }

        return user;
    }

    private UserDataFromDbUser(user: IUser) : UserData {
        let userData = new UserData();
        userData.setId(user._id);
        userData.setEmail(user.email);
        userData.setPassword(user.password);
        userData.setRole(user.role);
        userData.setAccesstoken(user.accessToken);
        userData.setCreateat(user.createAt);
        userData.setUpdateat(user.updateAt);

        return userData;
    }
}

export default new UserHelper();