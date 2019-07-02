import { Address } from './address';

export interface Provider {
  name: string;
  address: Address;
  description?: string;
  url?: string;
  userId?: string;
  id?: string;
}
