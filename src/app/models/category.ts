export class Category {

  constructor(
    public name: string,
    public description: string,
    public image: string,
    public providerId?: string,
    public id?: string
  ) {}
}
