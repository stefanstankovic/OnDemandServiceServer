export type HireResponseType = {
  hireRequestId: string;
  workerId: string;
  employerId: string;
  accepted: boolean;
  responseMessage: string;
};

export class HireResponse {
  constructor(
    private _hireRequestId: string | null = null,
    private _workerId: string | null = null,
    private _employerId: string | null = null,
    private _accepted: boolean | null = null,
    private _responseMessage: string | null = null
  ) {}

  get hireResponseObject(): HireResponseType {
    return {
      hireRequestId: this._hireRequestId!,
      workerId: this._workerId!,
      employerId: this._employerId!,
      accepted: this._accepted!,
      responseMessage: this._responseMessage!,
    };
  }

  set hireResponseObject(response: HireResponseType) {
    this._hireRequestId = response.hireRequestId;
    this._workerId = response.workerId;
    this._employerId = response.employerId;
    this._accepted = response.accepted;
    this._responseMessage = response.responseMessage;
  }
}
