// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var user_pb = require('./user_pb.js');

function serialize_user_Id(arg) {
  if (!(arg instanceof user_pb.Id)) {
    throw new Error('Expected argument of type user.Id');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_Id(buffer_arg) {
  return user_pb.Id.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_Login(arg) {
  if (!(arg instanceof user_pb.Login)) {
    throw new Error('Expected argument of type user.Login');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_Login(buffer_arg) {
  return user_pb.Login.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_Query(arg) {
  if (!(arg instanceof user_pb.Query)) {
    throw new Error('Expected argument of type user.Query');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_Query(buffer_arg) {
  return user_pb.Query.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_Response(arg) {
  if (!(arg instanceof user_pb.Response)) {
    throw new Error('Expected argument of type user.Response');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_Response(buffer_arg) {
  return user_pb.Response.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_UpdateUserDetailsRequest(arg) {
  if (!(arg instanceof user_pb.UpdateUserDetailsRequest)) {
    throw new Error('Expected argument of type user.UpdateUserDetailsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_UpdateUserDetailsRequest(buffer_arg) {
  return user_pb.UpdateUserDetailsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_UpdateUserRequest(arg) {
  if (!(arg instanceof user_pb.UpdateUserRequest)) {
    throw new Error('Expected argument of type user.UpdateUserRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_UpdateUserRequest(buffer_arg) {
  return user_pb.UpdateUserRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_UserData(arg) {
  if (!(arg instanceof user_pb.UserData)) {
    throw new Error('Expected argument of type user.UserData');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_UserData(buffer_arg) {
  return user_pb.UserData.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_UserDataResponse(arg) {
  if (!(arg instanceof user_pb.UserDataResponse)) {
    throw new Error('Expected argument of type user.UserDataResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_UserDataResponse(buffer_arg) {
  return user_pb.UserDataResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_UserDetails(arg) {
  if (!(arg instanceof user_pb.UserDetails)) {
    throw new Error('Expected argument of type user.UserDetails');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_UserDetails(buffer_arg) {
  return user_pb.UserDetails.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_UserDetailsResponse(arg) {
  if (!(arg instanceof user_pb.UserDetailsResponse)) {
    throw new Error('Expected argument of type user.UserDetailsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_UserDetailsResponse(buffer_arg) {
  return user_pb.UserDetailsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_WorkerOptions(arg) {
  if (!(arg instanceof user_pb.WorkerOptions)) {
    throw new Error('Expected argument of type user.WorkerOptions');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_WorkerOptions(buffer_arg) {
  return user_pb.WorkerOptions.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_WorkerOptionsRequest(arg) {
  if (!(arg instanceof user_pb.WorkerOptionsRequest)) {
    throw new Error('Expected argument of type user.WorkerOptionsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_WorkerOptionsRequest(buffer_arg) {
  return user_pb.WorkerOptionsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_WorkerOptionsResponse(arg) {
  if (!(arg instanceof user_pb.WorkerOptionsResponse)) {
    throw new Error('Expected argument of type user.WorkerOptionsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_WorkerOptionsResponse(buffer_arg) {
  return user_pb.WorkerOptionsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var UserService = exports.UserService = {
  addUser: {
    path: '/user.User/AddUser',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.UserData,
    responseType: user_pb.Response,
    requestSerialize: serialize_user_UserData,
    requestDeserialize: deserialize_user_UserData,
    responseSerialize: serialize_user_Response,
    responseDeserialize: deserialize_user_Response,
  },
  updateUser: {
    path: '/user.User/UpdateUser',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.UpdateUserRequest,
    responseType: user_pb.UserDataResponse,
    requestSerialize: serialize_user_UpdateUserRequest,
    requestDeserialize: deserialize_user_UpdateUserRequest,
    responseSerialize: serialize_user_UserDataResponse,
    responseDeserialize: deserialize_user_UserDataResponse,
  },
  findUserById: {
    path: '/user.User/FindUserById',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.Id,
    responseType: user_pb.UserDataResponse,
    requestSerialize: serialize_user_Id,
    requestDeserialize: deserialize_user_Id,
    responseSerialize: serialize_user_UserDataResponse,
    responseDeserialize: deserialize_user_UserDataResponse,
  },
  findUser: {
    path: '/user.User/FindUser',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.Query,
    responseType: user_pb.UserDataResponse,
    requestSerialize: serialize_user_Query,
    requestDeserialize: deserialize_user_Query,
    responseSerialize: serialize_user_UserDataResponse,
    responseDeserialize: deserialize_user_UserDataResponse,
  },
  addUserDetails: {
    path: '/user.User/AddUserDetails',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.UserDetails,
    responseType: user_pb.Response,
    requestSerialize: serialize_user_UserDetails,
    requestDeserialize: deserialize_user_UserDetails,
    responseSerialize: serialize_user_Response,
    responseDeserialize: deserialize_user_Response,
  },
  updateUserDetails: {
    path: '/user.User/UpdateUserDetails',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.UpdateUserDetailsRequest,
    responseType: user_pb.UserDetailsResponse,
    requestSerialize: serialize_user_UpdateUserDetailsRequest,
    requestDeserialize: deserialize_user_UpdateUserDetailsRequest,
    responseSerialize: serialize_user_UserDetailsResponse,
    responseDeserialize: deserialize_user_UserDetailsResponse,
  },
  findUserDetailsByUserId: {
    path: '/user.User/FindUserDetailsByUserId',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.Id,
    responseType: user_pb.UserDetailsResponse,
    requestSerialize: serialize_user_Id,
    requestDeserialize: deserialize_user_Id,
    responseSerialize: serialize_user_UserDetailsResponse,
    responseDeserialize: deserialize_user_UserDetailsResponse,
  },
  addWorkerOptions: {
    path: '/user.User/AddWorkerOptions',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.WorkerOptions,
    responseType: user_pb.Response,
    requestSerialize: serialize_user_WorkerOptions,
    requestDeserialize: deserialize_user_WorkerOptions,
    responseSerialize: serialize_user_Response,
    responseDeserialize: deserialize_user_Response,
  },
  updateWorkerOptions: {
    path: '/user.User/UpdateWorkerOptions',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.WorkerOptionsRequest,
    responseType: user_pb.WorkerOptionsResponse,
    requestSerialize: serialize_user_WorkerOptionsRequest,
    requestDeserialize: deserialize_user_WorkerOptionsRequest,
    responseSerialize: serialize_user_WorkerOptionsResponse,
    responseDeserialize: deserialize_user_WorkerOptionsResponse,
  },
  findWorkerOptionsByUserId: {
    path: '/user.User/FindWorkerOptionsByUserId',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.Id,
    responseType: user_pb.WorkerOptionsResponse,
    requestSerialize: serialize_user_Id,
    requestDeserialize: deserialize_user_Id,
    responseSerialize: serialize_user_WorkerOptionsResponse,
    responseDeserialize: deserialize_user_WorkerOptionsResponse,
  },
  validateLogin: {
    path: '/user.User/ValidateLogin',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.Login,
    responseType: user_pb.UserDataResponse,
    requestSerialize: serialize_user_Login,
    requestDeserialize: deserialize_user_Login,
    responseSerialize: serialize_user_UserDataResponse,
    responseDeserialize: deserialize_user_UserDataResponse,
  },
};

exports.UserClient = grpc.makeGenericClientConstructor(UserService);
