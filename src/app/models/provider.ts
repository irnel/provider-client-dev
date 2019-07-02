import { Address } from './address';

export interface Provider {
  name: string;
  address: Address;
  phone?: string;
  schedule?: string [];
  description?: string;
  url?: string;
  userId?: string;
  id?: string;
}
