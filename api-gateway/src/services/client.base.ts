import { ServiceError, ChannelCredentials} from 'grpc';

export class ClientBase<T> {
    protected _client : T | undefined;

    constructor ( protected readonly _serviceIp : string,
        protected readonly _servicePort : string,
        protected readonly _credentials: ChannelCredentials) {
    }

    protected getPromise<RequestT, ResponseT>(
        request : RequestT,
        handler : (request : RequestT, callback : (error: ServiceError | null, response: ResponseT) => void) => any
    ) : Promise<ResponseT> {
        return new Promise<ResponseT> ((resolve, reject) => {
            handler(request, (error: ServiceError | null, response: ResponseT) : void => {
                if(error){
                    reject(error);
                }
                resolve(response);
            });
        });
    }
}