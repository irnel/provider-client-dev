export class User {

  constructor (
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public roles?: Array<string>,
    public id?: number,
    public token?: string
  ) {}

}
