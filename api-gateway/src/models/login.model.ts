import { Login as GrpcLoginModel } from '../grpc/_proto/user/user_pb';
import { isNull } from 'lodash';

export type LoginType = {
    email: string,
    password: string
}

export class Login {
    constructor (
        public email : string | null = null,
        public password : string | null = null
    ) {}

    get grpcLogin() : GrpcLoginModel {
        const grpcLogin = new GrpcLoginModel();
        if (!isNull(this.email)) {
            grpcLogin.setEmail(this.email);
        }
        if (!isNull(this.password)) {
            grpcLogin.setPassword(this.password);
        }

        return grpcLogin;
    }

    set grpcLogin (grpcLogin : GrpcLoginModel) {
        this.email = grpcLogin.getEmail();
        this.password = grpcLogin.getPassword();
    }
}