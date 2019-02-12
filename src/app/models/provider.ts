import { Address } from './index';

export interface Provider {
  name: string;
  address: Address;
  description?: string;
  url?: string;
  userId?: string;
  id?: string;
}
