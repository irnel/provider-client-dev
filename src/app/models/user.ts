export class User {

  constructor (
    public firstName: string,
    public email: string,
    public password: string,
    public lastName: string,
    public id?: number,
    public token?: string
  ) {}
}
