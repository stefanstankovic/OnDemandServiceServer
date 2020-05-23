"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_helper_1 = require("../../helpers/user.helper");
const userDetails_helper_1 = require("../../helpers/userDetails.helper");
const user_grpc_pb_1 = require("../_proto/user/user_grpc_pb");
class UserHandler {
    constructor() {
        this.addUser = (call, callback) => {
            user_helper_1.default.AddUser(call.request)
                .then((response) => {
                callback(null, response);
            });
        };
        this.updateUser = (call, callback) => {
            user_helper_1.default.UpdateUser(call.request)
                .then((response) => {
                callback(null, response);
            });
        };
        this.findUserById = (call, callback) => {
            user_helper_1.default.FindUserById(call.request)
                .then((response) => {
                callback(null, response);
            });
        };
        this.findUser = (call, callback) => {
            // TODO implement find user function
            callback(null, null);
        };
        this.addUserDetails = (call, callback) => {
            userDetails_helper_1.default.AddUserDetails(call.request)
                .then((response) => {
                callback(null, response);
            });
        };
        this.updateUserDetails = (call, callback) => {
            userDetails_helper_1.default.UpdateUserDetails(call.request).then((response) => {
                callback(null, response);
            });
        };
        this.findUserDetailsByUserId = (call, callback) => {
            userDetails_helper_1.default.FindUserDetailsByUserId(call.request).then((response) => {
                callback(null, response);
            });
        };
        this.addWorkerOptions = (call, callback) => {
            callback(null, null);
        };
        this.updateWorkerOptions = (call, callback) => {
            callback(null, null);
        };
        this.findWorkerOptionsByUserId = (call, callback) => {
            callback(null, null);
        };
        this.validateLogin = (call, callback) => {
            user_helper_1.default.ValidateLogin(call.request).then((response) => {
                callback(null, response);
            });
        };
    }
}
exports.default = {
    server: user_grpc_pb_1.UserService,
    handler: new UserHandler()
};
//# sourceMappingURL=user.handler.js.map