import { Address } from './index';

export class Provider {

  constructor(
    public name: string,
    public description: string,
    public address: Address,
    public image?: string,
    public userId?: string,
    public id?: string
  ) {}

}
