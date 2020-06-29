// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var workers_pb = require('./workers_pb.js');

function serialize_workers_AllWorkersForEmployerResponse(arg) {
  if (!(arg instanceof workers_pb.AllWorkersForEmployerResponse)) {
    throw new Error('Expected argument of type workers.AllWorkersForEmployerResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_workers_AllWorkersForEmployerResponse(buffer_arg) {
  return workers_pb.AllWorkersForEmployerResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_workers_EmployerId(arg) {
  if (!(arg instanceof workers_pb.EmployerId)) {
    throw new Error('Expected argument of type workers.EmployerId');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_workers_EmployerId(buffer_arg) {
  return workers_pb.EmployerId.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_workers_HireRequest(arg) {
  if (!(arg instanceof workers_pb.HireRequest)) {
    throw new Error('Expected argument of type workers.HireRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_workers_HireRequest(buffer_arg) {
  return workers_pb.HireRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_workers_HireRequestId(arg) {
  if (!(arg instanceof workers_pb.HireRequestId)) {
    throw new Error('Expected argument of type workers.HireRequestId');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_workers_HireRequestId(buffer_arg) {
  return workers_pb.HireRequestId.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_workers_HireRequestQuery(arg) {
  if (!(arg instanceof workers_pb.HireRequestQuery)) {
    throw new Error('Expected argument of type workers.HireRequestQuery');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_workers_HireRequestQuery(buffer_arg) {
  return workers_pb.HireRequestQuery.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_workers_HireRequestResponse(arg) {
  if (!(arg instanceof workers_pb.HireRequestResponse)) {
    throw new Error('Expected argument of type workers.HireRequestResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_workers_HireRequestResponse(buffer_arg) {
  return workers_pb.HireRequestResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_workers_HireWorkerRequest(arg) {
  if (!(arg instanceof workers_pb.HireWorkerRequest)) {
    throw new Error('Expected argument of type workers.HireWorkerRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_workers_HireWorkerRequest(buffer_arg) {
  return workers_pb.HireWorkerRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_workers_Location(arg) {
  if (!(arg instanceof workers_pb.Location)) {
    throw new Error('Expected argument of type workers.Location');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_workers_Location(buffer_arg) {
  return workers_pb.Location.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_workers_LocationResult(arg) {
  if (!(arg instanceof workers_pb.LocationResult)) {
    throw new Error('Expected argument of type workers.LocationResult');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_workers_LocationResult(buffer_arg) {
  return workers_pb.LocationResult.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_workers_Radius(arg) {
  if (!(arg instanceof workers_pb.Radius)) {
    throw new Error('Expected argument of type workers.Radius');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_workers_Radius(buffer_arg) {
  return workers_pb.Radius.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_workers_Response(arg) {
  if (!(arg instanceof workers_pb.Response)) {
    throw new Error('Expected argument of type workers.Response');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_workers_Response(buffer_arg) {
  return workers_pb.Response.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_workers_Status(arg) {
  if (!(arg instanceof workers_pb.Status)) {
    throw new Error('Expected argument of type workers.Status');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_workers_Status(buffer_arg) {
  return workers_pb.Status.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_workers_WorkerData(arg) {
  if (!(arg instanceof workers_pb.WorkerData)) {
    throw new Error('Expected argument of type workers.WorkerData');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_workers_WorkerData(buffer_arg) {
  return workers_pb.WorkerData.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_workers_WorkerId(arg) {
  if (!(arg instanceof workers_pb.WorkerId)) {
    throw new Error('Expected argument of type workers.WorkerId');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_workers_WorkerId(buffer_arg) {
  return workers_pb.WorkerId.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_workers_WorkerStatus(arg) {
  if (!(arg instanceof workers_pb.WorkerStatus)) {
    throw new Error('Expected argument of type workers.WorkerStatus');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_workers_WorkerStatus(buffer_arg) {
  return workers_pb.WorkerStatus.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_workers_WorkersResponse(arg) {
  if (!(arg instanceof workers_pb.WorkersResponse)) {
    throw new Error('Expected argument of type workers.WorkersResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_workers_WorkersResponse(buffer_arg) {
  return workers_pb.WorkersResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var WorkersService = exports.WorkersService = {
  addWorker: {
    path: '/workers.Workers/AddWorker',
    requestStream: false,
    responseStream: false,
    requestType: workers_pb.WorkerData,
    responseType: workers_pb.Response,
    requestSerialize: serialize_workers_WorkerData,
    requestDeserialize: deserialize_workers_WorkerData,
    responseSerialize: serialize_workers_Response,
    responseDeserialize: deserialize_workers_Response,
  },
  removeWorker: {
    path: '/workers.Workers/RemoveWorker',
    requestStream: false,
    responseStream: false,
    requestType: workers_pb.WorkerId,
    responseType: workers_pb.Response,
    requestSerialize: serialize_workers_WorkerId,
    requestDeserialize: deserialize_workers_WorkerId,
    responseSerialize: serialize_workers_Response,
    responseDeserialize: deserialize_workers_Response,
  },
  getWorkers: {
    path: '/workers.Workers/GetWorkers',
    requestStream: false,
    responseStream: false,
    requestType: workers_pb.WorkerStatus,
    responseType: workers_pb.WorkersResponse,
    requestSerialize: serialize_workers_WorkerStatus,
    requestDeserialize: deserialize_workers_WorkerStatus,
    responseSerialize: serialize_workers_WorkersResponse,
    responseDeserialize: deserialize_workers_WorkersResponse,
  },
  freeWorkersInRadius: {
    path: '/workers.Workers/FreeWorkersInRadius',
    requestStream: false,
    responseStream: false,
    requestType: workers_pb.Radius,
    responseType: workers_pb.WorkersResponse,
    requestSerialize: serialize_workers_Radius,
    requestDeserialize: deserialize_workers_Radius,
    responseSerialize: serialize_workers_WorkersResponse,
    responseDeserialize: deserialize_workers_WorkersResponse,
  },
  updateWorkerStatus: {
    path: '/workers.Workers/UpdateWorkerStatus',
    requestStream: false,
    responseStream: false,
    requestType: workers_pb.Status,
    responseType: workers_pb.Response,
    requestSerialize: serialize_workers_Status,
    requestDeserialize: deserialize_workers_Status,
    responseSerialize: serialize_workers_Response,
    responseDeserialize: deserialize_workers_Response,
  },
  updateWorkerLocation: {
    path: '/workers.Workers/UpdateWorkerLocation',
    requestStream: false,
    responseStream: false,
    requestType: workers_pb.Location,
    responseType: workers_pb.Response,
    requestSerialize: serialize_workers_Location,
    requestDeserialize: deserialize_workers_Location,
    responseSerialize: serialize_workers_Response,
    responseDeserialize: deserialize_workers_Response,
  },
  getWorkerLocation: {
    path: '/workers.Workers/GetWorkerLocation',
    requestStream: false,
    responseStream: false,
    requestType: workers_pb.WorkerId,
    responseType: workers_pb.LocationResult,
    requestSerialize: serialize_workers_WorkerId,
    requestDeserialize: deserialize_workers_WorkerId,
    responseSerialize: serialize_workers_LocationResult,
    responseDeserialize: deserialize_workers_LocationResult,
  },
  hireWorker: {
    path: '/workers.Workers/HireWorker',
    requestStream: false,
    responseStream: false,
    requestType: workers_pb.HireWorkerRequest,
    responseType: workers_pb.Response,
    requestSerialize: serialize_workers_HireWorkerRequest,
    requestDeserialize: deserialize_workers_HireWorkerRequest,
    responseSerialize: serialize_workers_Response,
    responseDeserialize: deserialize_workers_Response,
  },
  allWorkersForEmployer: {
    path: '/workers.Workers/AllWorkersForEmployer',
    requestStream: false,
    responseStream: false,
    requestType: workers_pb.EmployerId,
    responseType: workers_pb.AllWorkersForEmployerResponse,
    requestSerialize: serialize_workers_EmployerId,
    requestDeserialize: deserialize_workers_EmployerId,
    responseSerialize: serialize_workers_AllWorkersForEmployerResponse,
    responseDeserialize: deserialize_workers_AllWorkersForEmployerResponse,
  },
  addHireRequest: {
    path: '/workers.Workers/AddHireRequest',
    requestStream: false,
    responseStream: false,
    requestType: workers_pb.HireRequest,
    responseType: workers_pb.Response,
    requestSerialize: serialize_workers_HireRequest,
    requestDeserialize: deserialize_workers_HireRequest,
    responseSerialize: serialize_workers_Response,
    responseDeserialize: deserialize_workers_Response,
  },
  getHireRequestById: {
    path: '/workers.Workers/GetHireRequestById',
    requestStream: false,
    responseStream: false,
    requestType: workers_pb.HireRequestId,
    responseType: workers_pb.HireRequestResponse,
    requestSerialize: serialize_workers_HireRequestId,
    requestDeserialize: deserialize_workers_HireRequestId,
    responseSerialize: serialize_workers_HireRequestResponse,
    responseDeserialize: deserialize_workers_HireRequestResponse,
  },
  getHireRequests: {
    path: '/workers.Workers/GetHireRequests',
    requestStream: false,
    responseStream: false,
    requestType: workers_pb.HireRequestQuery,
    responseType: workers_pb.HireRequestResponse,
    requestSerialize: serialize_workers_HireRequestQuery,
    requestDeserialize: deserialize_workers_HireRequestQuery,
    responseSerialize: serialize_workers_HireRequestResponse,
    responseDeserialize: deserialize_workers_HireRequestResponse,
  },
  updateHireRequest: {
    path: '/workers.Workers/UpdateHireRequest',
    requestStream: false,
    responseStream: false,
    requestType: workers_pb.HireRequest,
    responseType: workers_pb.Response,
    requestSerialize: serialize_workers_HireRequest,
    requestDeserialize: deserialize_workers_HireRequest,
    responseSerialize: serialize_workers_Response,
    responseDeserialize: deserialize_workers_Response,
  },
};

exports.WorkersClient = grpc.makeGenericClientConstructor(WorkersService);
