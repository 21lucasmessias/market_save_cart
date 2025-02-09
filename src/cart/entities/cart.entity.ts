import * as crypto from 'crypto';
import { Item } from './item.entity';

export class Cart {
  cartId: string;
  name: string;
  date: Date;
  items: Item[];

  constructor(name: string) {
    this.cartId = crypto.randomBytes(16).toString('hex');
    this.name = name;
    this.date = new Date();
    this.items = [];
  }
}
