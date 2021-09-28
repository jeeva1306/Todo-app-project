export class UserModel {
  constructor(
    public email: string,
    public id: string,
    public displayName: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  get token() {
    if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    } else {
      return this._token;
    }
  }
}
