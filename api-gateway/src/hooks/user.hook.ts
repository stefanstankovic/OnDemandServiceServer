import { Services } from '../services/service.registry';
import { EventEmitter } from 'events';
import { Events } from './event.types/event.types';

export class UserHook {
    private _evensBus : EventEmitter;

    constructor (private _services: Services) {
        this._evensBus = this._services.eventsBus;

        this._evensBus.on(Events.userSignUp, this.onSignup);
        this._evensBus.on(Events.userLogIn, this.onLogin);
    }

    onSignup(...args: any[]) {
    }

    onLogin(...args: any[]){

    }
}