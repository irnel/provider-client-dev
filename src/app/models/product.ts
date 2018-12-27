export class Product {
  constructor(
    public name: string,
    public price: number,
    public categoryName: string,
    public providerId: string,
    public categoryId: string,
    public image?: string,
    public description?: string,
    public id?: string
  ) {}
}
