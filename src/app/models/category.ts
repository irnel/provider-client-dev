export class Category {

  constructor(
    public restaurantId: string,
    public name: string,
    public description: string,
    public image: string,
    public id?: string
  ) {}
}
