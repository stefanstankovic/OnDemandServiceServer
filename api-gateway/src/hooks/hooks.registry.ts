import { Services } from '../services/service.registry'
import { UserHook } from './user.hook';
export class HooksRegistry {
    private _userHook : UserHook;

    constructor(private _services :Services){
        this._userHook = new UserHook(this._services);
    }

    get hooks() {
        return {
            user: this._userHook
        }
    }
}