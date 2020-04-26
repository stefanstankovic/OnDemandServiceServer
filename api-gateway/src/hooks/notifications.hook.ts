import { Services } from '../services/service.registry';
import { EventEmitter } from 'events';
import { Events } from './event.types/event.types';

export class NotificationsHook {
    private _evensBus : EventEmitter;

    constructor (private _services: Services) {
        this._evensBus = this._services.eventsBus;

    }
}