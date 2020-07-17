import { Server, Socket } from "socket.io";
import * as jwt from "jsonwebtoken";
import { isNil, isEmpty, isUndefined } from "lodash";
import { UnauthorizedError } from "../models/errors/unauthorized.error";
import { UserType, UserRole } from "../models/user/user.model";
import { Services } from "../services/service.registry";
import { Events } from "./event.types/event.types";
import { SocketEvents } from "./event.types/socket.event.types";
import { EventEmitter } from "events";

const socketList: { [key: string]: Socket } = {};

export class SocketHook {
  private _evensBus: EventEmitter;
  //private _socketsList: { [key: string]: Socket };

  constructor(private _services: Services, private _io: Server) {
    this._evensBus = this._services.eventsBus;
    //this._socketsList = {};

    /**
     * require identification form client side
     * const socket = io({
     * query: {
     *     'token': token
     * }
     *});
     */

    this._io.use((socket, next) => {
      let jwtToken = socket.handshake.query.token;
      if (isNil(jwtToken) || isEmpty(jwtToken)) {
        console.log(`error `);
        return next(
          new UnauthorizedError(
            "credentials_required",
            "No authorization token was found"
          )
        );
      }

      let decoded: object | string;

      try {
        decoded = jwt.verify(jwtToken, process.env.JWT_SECRET!);
      } catch (ex) {
        let error = ex as Error;
        let unauthorizedError = new UnauthorizedError(
          "invalid_token",
          error.message
        );
        unauthorizedError.stack = error.stack;

        return next(unauthorizedError);
      }

      socket.handshake.query.user =
        typeof decoded === "string"
          ? (JSON.parse(decoded) as UserType)
          : (decoded as UserType);
      return next();
    });

    this._io.on("connection", (socket: Socket) => {
      if (
        isNil(socket) ||
        isNil(socket.handshake) ||
        isNil(socket.handshake.query) ||
        isNil(socket.handshake.query.user)
      ) {
        socket.disconnect();
        return;
      }

      const user = socket.handshake.query.user as UserType;
      socketList[user.id!] = socket;
      this.subscribe(socket);
      this._services.eventsBus.emit(Events.userConnectedOnSocket, user, socket);
    });

    /**
     * Emit new message to user:
     * @param args[0] Socket event
     * @param args[1] user id
     * @param args[2] data
     */
    this._evensBus.on(Events.emitToUser, (...args: any[]): void => {
      const eventType = args[0];
      const userId = args[1];
      const data = args[2];

      if (isNil(eventType)) {
        throw new Error(`Event Type is missing in ${Events.emitToUser}`);
      }

      if (isNil(userId)) {
        throw new Error(`User id is missing in ${Events.emitToUser}`);
      }

      if (isNil(data)) {
        throw new Error(`Data is missing in ${Events.emitToUser}`);
      }

      if (isNil(socketList[userId])) {
        throw new Error(`User with id: ${userId} isn't connected on socket.`);
      }

      socketList[userId].emit(eventType, data);
    });

    this._evensBus.on(Events.notifyUser, (...args: any[]): void => {
      const userId = args[0];
      const data = args[1];

      if (isNil(socketList[userId])) {
        throw new Error(`User with id: ${userId} isn't connected on socket.`);
      }

      socketList[userId].emit(Events.notifyUser, data);
    });
  }

  private subscribe(socket: Socket) {
    if (isNil(socket)) {
      return;
    }

    socket.on("disconnect", () => {
      const user = socket.handshake.query.user as UserType;
      delete socketList[user.id!];

      this._services.eventsBus.emit(
        Events.userDisconnectedFromSocket,
        user,
        socket
      );
    });

    socket.on("test", (...args) => {
      const user = socket.handshake.query.user as UserType;
      console.log(JSON.stringify(user));
      console.log("test");
    });
  }

  private emitToUser(event: string, userId: string, ...data: any[]): void {}
}
