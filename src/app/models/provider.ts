import { Address, ImageInfo } from './index';

export class Provider {
  constructor(
    public name: string,
    public description: string,
    public address: Address,
    public images?: ImageInfo[],
    public userId?: string,
    public id?: string
  ) {}
}
