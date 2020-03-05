

export class UnauthorizedError extends Error {
    private _name : string  = "UnauthorizedError";
    private _status : number = 401;

    get name() : string {
        return this._name;
    }

    get status() : number {
        return this._status;
    }

 constructor (
    public code : string,
    public message : string
 ){
     super();
 }
}