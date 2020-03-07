import Rank, { IRank } from '../models/Rank.model';
import { Response, RanksResponse, RankData, Query } from '../grpc/_proto/ranks/ranks_pb';
import { isNull, isUndefined, set } from 'lodash';

export class RanksHelper {
    constructor() {}

    public async AddRank(rankData: RankData) : Promise<Response> {
        const response = new Response();

        try {
            const rank :IRank = new Rank ({
                userId: rankData.getUserid(),
                type: rankData.getType(),
                stars: rankData.getStars(),
                comment: rankData.getComment()
            });

            await rank.save();

            response.setSuccess(true);

        } catch (ex) {
            const err = ex as Error;
            response.setSuccess(false);
            response.setMessage(err.message);
        }

        return response;
    }

    public async GetRanks(query: Query) : Promise<RanksResponse> {
        const response = new RanksResponse();
        try {
        const documentQuery = Rank.find(this.BuildMongoQuery(query), {}, {skip: query.getSkip(), limit: query.getTake()});
        const result = await documentQuery.exec();

        response.setSuccess(true);
        response.setRanksList(result.map( (value) => {
            const data = new RankData();
            data.setUserid(value.userId);
            data.setType(value.type);
            data.setStars(value.stars);
            data.setComment(value.comment);
            
            return data;
        }));
        } catch (ex) {
            const err =  ex as Error;
            response.setSuccess(false);
            response.setMessage(err.message);
        }
        return response;
    }

    private BuildMongoQuery(query: Query) : Object {
        const mongoQuery = new Object();

        if (!isNull(query.getUserid()) && !isUndefined(query.getUserid())) {
            set(mongoQuery, "userId", query.getUserid());
        }

        if (!isNull(query.getType()) && !isUndefined(query.getType())) {
            set(mongoQuery, "type", query.getType());
        }

        if (!isNull(query.getStars()) && !isUndefined(query.getStars())) {
            set(mongoQuery, "starts", query.getStars());
        }

        if (!isNull(query.getCommentpattren()) && !isUndefined(query.getCommentpattren())) {
            set(mongoQuery, "comment", { $regex: '.*' + query.getCommentpattren() + '.*' });
        }

        return mongoQuery;
    }
}