// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var ranks_pb = require('./ranks_pb.js');

function serialize_ranks_Query(arg) {
  if (!(arg instanceof ranks_pb.Query)) {
    throw new Error('Expected argument of type ranks.Query');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ranks_Query(buffer_arg) {
  return ranks_pb.Query.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ranks_RankData(arg) {
  if (!(arg instanceof ranks_pb.RankData)) {
    throw new Error('Expected argument of type ranks.RankData');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ranks_RankData(buffer_arg) {
  return ranks_pb.RankData.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ranks_RanksResponse(arg) {
  if (!(arg instanceof ranks_pb.RanksResponse)) {
    throw new Error('Expected argument of type ranks.RanksResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ranks_RanksResponse(buffer_arg) {
  return ranks_pb.RanksResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ranks_Response(arg) {
  if (!(arg instanceof ranks_pb.Response)) {
    throw new Error('Expected argument of type ranks.Response');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ranks_Response(buffer_arg) {
  return ranks_pb.Response.deserializeBinary(new Uint8Array(buffer_arg));
}


var RanksService = exports.RanksService = {
  addRank: {
    path: '/ranks.Ranks/AddRank',
    requestStream: false,
    responseStream: false,
    requestType: ranks_pb.RankData,
    responseType: ranks_pb.Response,
    requestSerialize: serialize_ranks_RankData,
    requestDeserialize: deserialize_ranks_RankData,
    responseSerialize: serialize_ranks_Response,
    responseDeserialize: deserialize_ranks_Response,
  },
  getRanks: {
    path: '/ranks.Ranks/GetRanks',
    requestStream: false,
    responseStream: false,
    requestType: ranks_pb.Query,
    responseType: ranks_pb.RanksResponse,
    requestSerialize: serialize_ranks_Query,
    requestDeserialize: deserialize_ranks_Query,
    responseSerialize: serialize_ranks_RanksResponse,
    responseDeserialize: deserialize_ranks_RanksResponse,
  },
};

exports.RanksClient = grpc.makeGenericClientConstructor(RanksService);
