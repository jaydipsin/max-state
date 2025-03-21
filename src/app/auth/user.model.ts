export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      console.log(this._tokenExpirationDate);
      console.log(this._token);

      return null;
    }
    return this._token;
  }
}
