import * as grpc from 'grpc';
import {
    IRanksClient,
    RanksClient as GrpcRanksClient
} from '../../grpc/_proto/ranks/ranks_grpc_pb';

import { ClientBase } from '../client.base';

import {
    RankData,
    RanksResponse,
    Response,
    Query
} from '../../grpc/_proto/ranks/ranks_pb';

export class RanksClient extends ClientBase<IRanksClient> {
    constructor(ranksServiceIp: string, ranksServicePort : string, credentials: grpc.ChannelCredentials) {
        super(ranksServiceIp, ranksServicePort, credentials);

        this._client = new GrpcRanksClient(
            `${this._serviceIp}:${this._servicePort}`, this._credentials);
    }

    addRank(rank: RankData) : Promise<Response> {
        return new Promise<Response> ((resolve, reject) => {
            this._client!.addRank(rank, (error: grpc.ServiceError | null, response: Response) : void => {
                if(error){
                    reject(error);
                }
                resolve(response);
            });
        });
    }

    getRanks(query: Query) : Promise<RanksResponse> {
        return new Promise<RanksResponse> ((resolve, reject) => {
            this._client!.getRanks(query, (error: grpc.ServiceError | null, response: RanksResponse) : void => {
                if(error){
                    reject(error);
                }
                resolve(response);
            });
        });
    }
}