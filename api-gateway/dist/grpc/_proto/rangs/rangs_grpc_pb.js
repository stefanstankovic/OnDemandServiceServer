// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var rangs_pb = require('./rangs_pb.js');

function serialize_rangs_Query(arg) {
  if (!(arg instanceof rangs_pb.Query)) {
    throw new Error('Expected argument of type rangs.Query');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_rangs_Query(buffer_arg) {
  return rangs_pb.Query.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_rangs_RangData(arg) {
  if (!(arg instanceof rangs_pb.RangData)) {
    throw new Error('Expected argument of type rangs.RangData');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_rangs_RangData(buffer_arg) {
  return rangs_pb.RangData.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_rangs_RangsResponse(arg) {
  if (!(arg instanceof rangs_pb.RangsResponse)) {
    throw new Error('Expected argument of type rangs.RangsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_rangs_RangsResponse(buffer_arg) {
  return rangs_pb.RangsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_rangs_Response(arg) {
  if (!(arg instanceof rangs_pb.Response)) {
    throw new Error('Expected argument of type rangs.Response');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_rangs_Response(buffer_arg) {
  return rangs_pb.Response.deserializeBinary(new Uint8Array(buffer_arg));
}


var RangsService = exports.RangsService = {
  addRang: {
    path: '/rangs.Rangs/AddRang',
    requestStream: false,
    responseStream: false,
    requestType: rangs_pb.RangData,
    responseType: rangs_pb.Response,
    requestSerialize: serialize_rangs_RangData,
    requestDeserialize: deserialize_rangs_RangData,
    responseSerialize: serialize_rangs_Response,
    responseDeserialize: deserialize_rangs_Response,
  },
  getRangs: {
    path: '/rangs.Rangs/GetRangs',
    requestStream: false,
    responseStream: false,
    requestType: rangs_pb.Query,
    responseType: rangs_pb.RangsResponse,
    requestSerialize: serialize_rangs_Query,
    requestDeserialize: deserialize_rangs_Query,
    responseSerialize: serialize_rangs_RangsResponse,
    responseDeserialize: deserialize_rangs_RangsResponse,
  },
};

exports.RangsClient = grpc.makeGenericClientConstructor(RangsService);
