import { Location as GrpcLocation } from "../../grpc/_proto/workers/workers_pb";
import { isNull } from "lodash";

export type LocationType = {
  workerId: string;
  latitude: string;
  longitude: string;
};

export class Location {
  constructor(
    private _workerId: string | null = null,
    private _latitude: string | null = null,
    private _longitude: string | null = null
  ) {}

  get grpcLocation(): GrpcLocation {
    const location = new GrpcLocation();

    location.setWorkerid(this._workerId!);
    location.setLatitude(this._latitude!);
    location.setLongitude(this._longitude!);

    return location;
  }

  set grpcLocation(location: GrpcLocation) {
    this._workerId = location.getWorkerid();
    this._latitude = location.getLatitude();
    this._longitude = location.getLongitude();
  }

  get locationObject(): LocationType {
    return {
      workerId: this._workerId!,
      latitude: this._latitude!,
      longitude: this._longitude!,
    };
  }

  set locationObject(location: LocationType) {
    this._workerId = location.workerId;
    this._latitude = location.latitude;
    this._longitude = location.longitude;
  }
}
