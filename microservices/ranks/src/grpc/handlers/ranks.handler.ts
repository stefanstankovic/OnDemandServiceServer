import * as grpc from 'grpc';

import {IRanksServer, RanksService} from '../_proto/ranks/ranks_grpc_pb';
import {
    RankData,
    RanksResponse,
    Query,
    Response
} from '../_proto/ranks/ranks_pb';

import { RanksHelper } from '../../helpers/rank.helper';

class RanksHandler implements IRanksServer {
    private _ranksHelper: RanksHelper;

    constructor() {
        this._ranksHelper = new RanksHelper();
    }
    addRank = (
        call: grpc.ServerUnaryCall<RankData>,
        callback: grpc.sendUnaryData<Response>): void => {
            this._ranksHelper.AddRank(call.request)
                .then((response) => {
                    callback(null, response);
                });
    };

    getRanks = (
        call: grpc.ServerUnaryCall<Query>,
        callback: grpc.sendUnaryData<RanksResponse>): void => {
            this._ranksHelper.GetRanks(call.request)
                .then((response) => {
                    callback(null, response);
                })
    };
}

export default {
    server: RanksService,
    handler: new RanksHandler()
};