import { Server, Socket } from 'socket.io';
import * as jwt from 'jsonwebtoken';
import { isNil, isEmpty } from 'lodash';
import { UnauthorizedError } from '../models/errors/unauthorized.error';
import { UserType, UserRole } from '../models/user/user.model';
import { Services } from '../services/service.registry';
import { Events } from './event.types/event.types';
import { SocketEvents } from './event.types/socket.event.types';
import { EventEmitter } from 'events';

export class SocketHook {

    private _evensBus: EventEmitter;
    private _socketsList: { [key: string]: Socket };

    constructor(private _services: Services, private _io: Server) {
        this._evensBus = this._services.eventsBus;
        this._socketsList = {};

        /**
         * require identification form client side
         * const socket = io({
         *  transportOptions: {
         *      polling: {
         *       extraHeaders: {
         *               'token': token
         *           }
         *       }
         *   }
         *});
        */

        this._io.use((socket, next) => {
            console.log(`user connect, token: ${socket.handshake.query.token}`);
            let jwtToken = socket.handshake.query;
            if (isNil(jwtToken) || isEmpty(jwtToken)) {
                console.log(`error `);
                return next(new UnauthorizedError('credentials_required', 'No authorization token was found'));
            }

            let decoded: object | string;

            try {
                decoded = jwt.verify(jwtToken, process.env.JWT_SECRET!);
            } catch (ex) {
                let error = ex as Error;
                let unauthorizedError = new UnauthorizedError('invalid_token', error.message);
                unauthorizedError.stack = error.stack;

                return next(unauthorizedError);
            }

            socket.handshake.query.user = typeof decoded === 'string' ? JSON.parse(decoded) as UserType : decoded as UserType;
        });

        this._io.on("connection", (socket: Socket) => {

            console.log("user is connected");
            if (isNil(socket.handshake.query.user)) {
                socket.disconnect();
                return;
            }

            const user = socket.handshake.query.user as UserType;
            this._socketsList[user.id!] = socket;
            this.subscribe(socket);
            this._services.eventsBus.emit(Events.userConnectedOnSocket, user, socket);
        });

        this._evensBus.on(Events.emitToUser, (...args: any[]): void => {
            this.emitToUser(args[0], args[1], ...args[3]);
        });

        this._evensBus.on(Events.notifyUser, (...args: any[]): void => {
            this.emitToUser(SocketEvents.newNotification, args[0], ...args[1]);
        });
    }

    private subscribe(socket: Socket) {
        socket.on('disconnect', () => {
            if (isNil(socket.handshake.query.user)) {
                return;
            }

            const user = socket.handshake.query.user as UserType;
            delete this._socketsList[user.id!];

            this._services.eventsBus.emit(Events.userDisconnectedFromSocket, user, socket);
        });

        if (socket.handshake.query.user.role === UserRole.Worker) {
            socket.on(SocketEvents.locationChanged, (...args) => {
                this._evensBus.emit(Events.workerChangedLocation, args);
            });
        }

        socket.on('test', (...args) => { console.log("test"); });
    }

    private emitToUser(event: string, userId: string, ...data: any[]): void {
        if (isNil(this._socketsList[userId])) {
            throw new Error(`User with id: ${userId} isn't connected on socket.`)
        }

        this._socketsList[userId].emit(event, data);
    }

}