import UserDevice, { IUserDevice } from "../models/userDevice.model";
import {
  UserDeviceData,
  UserDevicesData,
  Response,
  UserId,
  DeviceId,
} from "../grpc/_proto/notifications/notifications_pb";
import { isNull } from "lodash";
// TODO : Implement email logic
export class UserDeviceHelper {
  constructor() {}

  async AddUserDevice(userDevice: UserDeviceData): Promise<Response> {
    const response: Response = new Response();
    try {
      const device = await UserDevice.findOne({
        userId: userDevice.getUserid(),
        deviceToken: userDevice.getUserdevice(),
      }).exec();

      if (!isNull(device)) {
        response.setSuccess(true);
        response.setId(device.id);
      } else {
        const newUserDevice: IUserDevice = new UserDevice({
          userId: userDevice.getUserid(),
          deviceToken: userDevice.getUserdevice(),
        });

        var savedDevice = await newUserDevice.save();
        response.setSuccess(true);
        response.setId(savedDevice._id);
      }
    } catch (ex) {
      const err = ex as Error;
      response.setSuccess(false);
      response.setMessage(err.message);
    }

    return response;
  }

  async GetUserDevices(userId: UserId): Promise<UserDevicesData> {
    const response: UserDevicesData = new UserDevicesData();
    try {
      const query = UserDevice.find({ userId: userId.getId() });
      const devices = (await query.exec()) as Array<IUserDevice>;

      response.setDevicesList(
        devices.map((value) => {
          const userDevice = new UserDeviceData();
          userDevice.setId(value.id);
          userDevice.setUserid(value.userId);
          userDevice.setUserdevice(value.deviceToken);
          return userDevice;
        })
      );
      response.setSuccess(true);
    } catch (ex) {
      const err = ex as Error;
      response.setSuccess(false);
      response.setMessage(err.message);
    }

    return response;
  }

  async RemoveUserDevice(userDeviceId: DeviceId): Promise<Response> {
    const response: Response = new Response();
    try {
      await UserDevice.deleteOne({
        deviceToken: userDeviceId.getId(),
      }).exec();
      response.setSuccess(true);
    } catch (ex) {
      const err = ex as Error;
      response.setSuccess(false);
      response.setMessage(err.message);
    }

    return response;
  }
}
