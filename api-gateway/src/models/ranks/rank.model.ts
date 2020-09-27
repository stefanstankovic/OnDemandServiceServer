import { RankData as GrpcRankData } from "../../grpc/_proto/ranks/ranks_pb";

export type RankType = {
  userId: string;
  rankedById: string;
  type: string;
  stars: number;
  comment: string;
};

export class Rank {
  constructor(
    private _userId: string | null = null,
    private _rankedById: string | null = null,
    private _type: string | null = null,
    private _stars: number | null = null,
    private _comment: string | null = null
  ) {}

  get grpcRankData(): GrpcRankData {
    const rank = new GrpcRankData();

    rank.setUserid(this._userId!);
    rank.setRankedbyid(this._rankedById!);
    rank.setType(this._type!);
    rank.setStars(this._stars!);
    rank.setComment(this._comment!);

    return rank;
  }

  set grpcRankData(rank: GrpcRankData) {
    this._userId = rank.getUserid();
    this._rankedById = rank.getRankedbyid();
    this._type = rank.getType();
    this._stars = rank.getStars();
    this._comment = rank.getComment();
  }

  get rankObject(): RankType {
    return {
      userId: this._userId!,
      rankedById: this._rankedById!,
      type: this._type!,
      stars: this._stars!,
      comment: this._comment!,
    };
  }

  set rankObject(rank: RankType) {
    this._userId = rank.userId;
    this._rankedById = rank.rankedById;
    this._type = rank.type;
    this._stars = rank.stars;
    this._comment = rank.comment;
  }
}
