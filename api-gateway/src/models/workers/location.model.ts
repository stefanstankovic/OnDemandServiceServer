import { Location as GrpcLocation } from "../../grpc/_proto/workers/workers_pb";
import { isNull } from "lodash";

export type LocationType = {
  workerId: string;
  latitude: number;
  longitude: number;
  createdAt: string;
};

export class Location {
  constructor(
    private _workerId: string | null = null,
    private _latitude: string | null = null,
    private _longitude: string | null = null,
    private _createdAd: string | null = null
  ) {}

  get grpcLocation(): GrpcLocation {
    const location = new GrpcLocation();

    location.setWorkerid(this._workerId!);
    location.setLatitude(this._latitude!);
    location.setLongitude(this._longitude!);
    location.setCreatedat(this._createdAd!);

    return location;
  }

  set grpcLocation(location: GrpcLocation) {
    this._workerId = location.getWorkerid();
    this._latitude = location.getLatitude();
    this._longitude = location.getLongitude();
    this._createdAd = location.getCreatedat();
  }

  get locationObject(): LocationType {
    return {
      workerId: this._workerId!,
      latitude: +this._latitude!,
      longitude: +this._longitude!,
      createdAt: this._createdAd!,
    };
  }

  set locationObject(location: LocationType) {
    this._workerId = location.workerId;
    this._latitude = location.latitude.toString();
    this._longitude = location.longitude.toString();
    this._createdAd = location.createdAt;
  }
}
