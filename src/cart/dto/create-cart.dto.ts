import { Item } from '../entities/item.entity';

export class CreateCartDto {
  readonly name: string;
  readonly items: Item[];
}
