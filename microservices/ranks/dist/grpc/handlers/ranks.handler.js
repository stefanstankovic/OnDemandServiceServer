"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ranks_grpc_pb_1 = require("../_proto/ranks/ranks_grpc_pb");
const rank_helper_1 = require("../../helpers/rank.helper");
class RanksHandler {
    constructor() {
        this.addRank = (call, callback) => {
            this._ranksHelper.AddRank(call.request)
                .then((response) => {
                callback(null, response);
            });
        };
        this.getRanks = (call, callback) => {
            this._ranksHelper.GetRanks(call.request)
                .then((response) => {
                callback(null, response);
            });
        };
        this._ranksHelper = new rank_helper_1.RanksHelper();
    }
}
exports.default = {
    server: ranks_grpc_pb_1.RanksService,
    handler: new RanksHandler()
};
//# sourceMappingURL=ranks.handler.js.map