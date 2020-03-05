import { UserData, AccessToken as GrpcAccessToken } from '../grpc/_proto/user/user_pb';
import { AccessToken } from './accessToken.model';
import { isNull, isUndefined } from 'lodash';


export type UserType = {
    email: string;
    mobile: string;
    password: string;
    role: string;
    id: string | null;
    createAt: string | null;
    updateAt: string | null;
    accessToken: AccessToken | null;
};

export class User /*implements IUser*/ {
    constructor(
        public email: string,
        public mobile: string,
        public password: string,
        public role: string,
        public id: string | null = null,
        public createAt: string | null = null,
        public updateAt: string | null = null,
        public accessToken: AccessToken | null = null,)
    { };

    get grpcUserData(): UserData {

        const grpcUserData = new UserData();

        if (!isNull(this.id)) {
            grpcUserData.setId(this.id);
        }
        grpcUserData.setEmail(this.email);
        grpcUserData.setMobile(this.mobile);
        grpcUserData.setPassword(this.password);
        grpcUserData.setRole(this.role);

        if (!isNull(this.accessToken)){
            grpcUserData.setAccesstoken(this.accessToken.grpcAccessToken);
        }

        return grpcUserData;
    }

    set grpcUserData(grpcUserData: UserData){
        this.id = grpcUserData.getId();
        this.email = grpcUserData.getEmail();
        this.mobile = grpcUserData.getMobile();
        this.password = grpcUserData.getPassword();
        this.role = grpcUserData.getRole();
        this.createAt = grpcUserData.getCreateat();
        this.updateAt = grpcUserData.getUpdateat();

        let grpcAccessToken : GrpcAccessToken | undefined= grpcUserData.getAccesstoken();

        if (!isUndefined(grpcAccessToken)) {
            this.accessToken = new AccessToken();
            this.accessToken.grpcAccessToken = grpcAccessToken;
        }

    }
}