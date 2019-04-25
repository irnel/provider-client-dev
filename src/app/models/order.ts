import { Product } from './product';

export interface Order {
  createdDate: string;
  pickupTime: string;
  status: string;
  paid: boolean;
  remarks?: string;
  products?: Product [];
  providerName?: string;
  providerId?: string;
  displayName?: string;
  userId?: string;
  id?: string;
}
