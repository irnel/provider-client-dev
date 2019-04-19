import { Product } from './product';

export interface Order {
  createDate: Date;
  pickupTime: string;
  status: string;
  paid: boolean;
  remarks?: string;
  products?: Product [];
  providerName?: string;
  providerId?: string;
  id?: string;
}
