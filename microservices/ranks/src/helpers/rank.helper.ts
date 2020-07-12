import Rank, { IRank } from "../models/rank.model";
import {
  Response,
  RanksResponse,
  RankData,
  Query,
} from "../grpc/_proto/ranks/ranks_pb";
import { set, isNil, isString, isEmpty, isNumber } from "lodash";

export class RanksHelper {
  constructor() {}

  public async AddRank(rankData: RankData): Promise<Response> {
    const response = new Response();

    try {
      const rank: IRank = new Rank({
        userId: rankData.getUserid(),
        rankedById: rankData.getRankedbyid(),
        type: rankData.getType(),
        stars: rankData.getStars(),
        comment: rankData.getComment(),
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

  public async GetRanks(query: Query): Promise<RanksResponse> {
    const response = new RanksResponse();
    try {
      const documentQuery = Rank.find(
        this.BuildMongoQuery(query),
        {},
        { skip: query.getSkip(), limit: query.getTake() }
      );
      const result = await documentQuery.exec();

      response.setSuccess(true);
      response.setRanksList(
        result.map((value: IRank) => {
          const data = new RankData();
          data.setUserid(value.userId);
          data.setRankedbyid(value.rankedById);
          data.setType(value.type);
          data.setStars(value.stars);
          data.setComment(value.comment);

          return data;
        })
      );
    } catch (ex) {
      const err = ex as Error;
      response.setSuccess(false);
      response.setMessage(err.message);
    }
    return response;
  }

  private BuildMongoQuery(query: Query): Object {
    const mongoQuery = new Object();

    if (
      !isNil(query.getUserid()) &&
      isString(query.getUserid()) &&
      !isEmpty(query.getUserid())
    ) {
      set(mongoQuery, "userId", query.getUserid());
    }

    if (
      !isNil(query.getType()) &&
      isString(query.getType()) &&
      !isEmpty(query.getType())
    ) {
      set(mongoQuery, "type", query.getType());
    }

    if (
      isNil(query.getRangerid()) &&
      isString(query.getRangerid()) &&
      !isEmpty(query.getRangerid())
    ) {
      set(mongoQuery, "rankedById", query.getRangerid());
    }

    if (
      !isNil(query.getStars()) &&
      isNumber(query.getStars()) &&
      query.getStars() >= 1 &&
      query.getStars() <= 5
    ) {
      set(mongoQuery, "starts", query.getStars());
    }

    if (
      !isNil(query.getCommentpattren()) &&
      isString(query.getCommentpattren()) &&
      !isEmpty(query.getCommentpattren())
    ) {
      set(mongoQuery, "comment", {
        $regex: ".*" + query.getCommentpattren() + ".*",
      });
    }

    return mongoQuery;
  }
}
