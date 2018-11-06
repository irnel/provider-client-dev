export class User {

  // TODO: add roles atributte

  constructor (
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public id?: number,
    public token?: string
  ) {}
}
