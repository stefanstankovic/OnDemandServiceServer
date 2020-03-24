import { Services } from '../services/service.registry'
import { UserHook } from './user.hook';
import { Server } from 'socket.io';
import { SocketHook } from './socket.hook';
import { NotificationsHook } from './notifications.hook';
import { RanksHook } from './ranks.hook';
import { WorkersHook } from './workers.hook';

export class HooksRegistry {
    private _userHook : UserHook;
    private _socketHook: SocketHook;
    private _notificationsHook: NotificationsHook;
    private _ranksHook: RanksHook;
    private _workersHook: WorkersHook;

    constructor(private _services :Services, private _io: Server) {
        this._userHook = new UserHook(this._services);
        this._notificationsHook = new NotificationsHook(this._services);
        this._ranksHook = new RanksHook(this._services);
        this._workersHook = new WorkersHook(this._services);
        this._socketHook = new SocketHook(this._services, this._io);
    }

    get hooks() {
        return {
            user: this._userHook,
            socket: this._socketHook,
            notifications: this._notificationsHook,
            ranks: this._ranksHook,
            workers: this._workersHook
        }
    }
}