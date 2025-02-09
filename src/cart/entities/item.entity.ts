import * as crypto from 'crypto';

export class Item {
  id: string;
  name: string;
  quantity: number;

  constructor(name: string, quantity: number) {
    this.id = crypto.randomBytes(16).toString('hex');
    this.name = name;
    this.quantity = quantity;
  }
}
