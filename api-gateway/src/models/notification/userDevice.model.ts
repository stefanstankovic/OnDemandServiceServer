import { UserDeviceData as GrpcUserDeviceData } from "../../grpc/_proto/notifications/notifications_pb";
import { isNil } from "lodash";

export type UserDeviceType = {
  id: string | null;
  userId: string;
  deviceId: string;
};

export class UserDevice {
  constructor(
    private _id: string | null = null,
    private _userId: string | null = null,
    private _deviceId: string | null = null
  ) {}

  get grpcUserDeviceData(): GrpcUserDeviceData {
    const deviceData = new GrpcUserDeviceData();
    if (!isNil(this._id)) {
      deviceData.setId(this._id);
    }
    deviceData.setUserid(this._userId!);
    deviceData.setUserdevice(this._deviceId!);

    return deviceData;
  }

  set grpcUserDeviceData(userDeviceData: GrpcUserDeviceData) {
    this._id = userDeviceData.getId();
    this._userId = userDeviceData.getUserid();
    this._deviceId = userDeviceData.getUserdevice();
  }

  get userDeviceObject(): UserDeviceType {
    return {
      id: this._id,
      userId: this._userId!,
      deviceId: this._deviceId!,
    };
  }

  set userDeviceObject(userDevice: UserDeviceType) {
    this._id = userDevice.id;
    this._userId = userDevice.userId;
    this._deviceId = userDevice.deviceId;
  }
}
