import { Injectable } from '@nestjs/common';
import { InMemoryDatabase } from '../database/in-memory-database';
import { AddItemDto } from './dto/add-item.dto';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class CartService {
  constructor(private inMemoryDatabase: InMemoryDatabase) {}

  create(createCartDto: CreateCartDto) {
    return this.inMemoryDatabase.createCart(createCartDto);
  }

  findAll() {
    return this.inMemoryDatabase.findAllCarts();
  }

  findOne(id: string) {
    return this.inMemoryDatabase.findCartById(id);
  }

  update(id: string, updateCartDto: UpdateCartDto) {
    return this.inMemoryDatabase.updateCart(id, updateCartDto);
  }

  remove(id: string) {
    return this.inMemoryDatabase.removeCart(id);
  }

  addItem(id: string, addItemDto: AddItemDto) {
    const newItem = new Item(addItemDto.name, addItemDto.quantity);
    return this.inMemoryDatabase.addItemToCart(id, newItem);
  }

  removeItem(cartId: string, itemId: string) {
    return this.inMemoryDatabase.removeItemFromCart(cartId, itemId);
  }

  updateItem(cartId: string, itemId: string, updateItemDto: UpdateItemDto) {
    return this.inMemoryDatabase.updateItemInCart(
      cartId,
      itemId,
      updateItemDto,
    );
  }
}
