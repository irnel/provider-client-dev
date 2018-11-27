export class Address {

  constructor(
    public formattedAddress: string,
    public lat: number,
    public lng: number,
    public number?: string
  ) {}

}
