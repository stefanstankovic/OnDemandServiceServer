import { RequestHandler } from "express";
import { ServiceRegistry } from "../services/service.registry";

import { Query, RanksResponse, RankData } from "../grpc/_proto/ranks/ranks_pb";
import { RankType, Rank } from "../models/ranks/rank.model";
export const getRanks: RequestHandler = async (req, res, next) => {
  const { workerId } = req.params;

  const rankQuery: Query = new Query();
  rankQuery.setUserid(workerId);

  const ranksResponse: RanksResponse = await ServiceRegistry.getInstance().services.ranksClient.getRanks(
    rankQuery
  );

  if (!ranksResponse.getSuccess()) {
    res
      .status(400)
      .json({ success: false, message: ranksResponse.getMessage() });
    return next();
  }

  const ranksData: RankData[] = ranksResponse.getRanksList();

  const ranks: RankType[] = ranksData.map((val) => {
    let rank = new Rank();
    rank.grpcRankData = val;
    return rank.rankObject;
  });

  res.status(201).json({ success: true, workerId: workerId, ranks: ranks });
};

export const addRanks: RequestHandler = async (req, res, next) => {
  const rankBody: RankType = req.body as RankType;
  const rank: Rank = new Rank();
  rank.rankObject = rankBody;

  // TODO: Implement check before adding rank

  res.status(201).json({ success: true });
};
