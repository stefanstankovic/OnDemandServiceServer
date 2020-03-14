import { AccessToken as GrpcAccessToken} from '../../grpc/_proto/user/user_pb';

export class AccessToken {

    constructor (
        public token: string = "",
        public expired: boolean = false,
        public expiration: string = ""
    ) { }

    get grpcAccessToken() {
        const accessToken : GrpcAccessToken = new GrpcAccessToken();
        accessToken.setExpiration(this.expiration);
        accessToken.setExpired(this.expired);
        accessToken.setToken(this.token);

        return accessToken;
    }

    set grpcAccessToken(accessToken: GrpcAccessToken) {
        this.expiration = accessToken.getExpiration();
        this.expired = accessToken.getExpired();
        this.token = accessToken.getToken();
    }
}