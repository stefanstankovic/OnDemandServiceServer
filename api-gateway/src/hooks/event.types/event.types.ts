export enum Events {
  userSignUp = "user.signup",
  userLogIn = "user.login",
  emitToUser = "socket.emit.to.user",
  userConnectedOnSocket = "socket.user.connected",
  userDisconnectedFromSocket = "socket.user.disconnected",
  notifyUser = "socket.notify.user",
  workerChangedLocation = "socket.worker.moved",
  workerHireRequest = "worker.hire.request",
  workerAcceptedHireRequest = "worker.accepted.hire.request",
  workerRejectedHireRequest = "worker.rejected.hire.request",
}
