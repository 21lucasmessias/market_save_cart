import { Injectable } from '@nestjs/common';
import { CreateCartDto } from '../cart/dto/create-cart.dto';
import { UpdateCartDto } from '../cart/dto/update-cart.dto';
import { Cart } from '../cart/entities/cart.entity';
import { Item } from '../cart/entities/item.entity';

@Injectable()
export class InMemoryDatabase {
  carts: Cart[] = [];

  createCart(createCartDto: CreateCartDto) {
    const newCart = new Cart(createCartDto.name);

    if (createCartDto.items) {
      newCart.items = createCartDto.items.map((item) => {
        return new Item(item.name, item.quantity);
      });
    }

    this.carts.push(newCart);

    return newCart;
  }

  findAllCarts() {
    return this.carts;
  }

  findCartById(id: string) {
    return this.carts.find((cart) => cart.cartId === id);
  }

  removeCart(id: string) {
    const cart = this.findCartById(id);
    if (!cart) {
      return null;
    }

    this.carts = this.carts.filter((cart) => cart.cartId !== id);
  }

  updateCart(id: string, updateCartDto: UpdateCartDto) {
    const cart = this.findCartById(id);
    if (!cart) {
      return null;
    }

    cart.name = updateCartDto.name;

    return cart;
  }

  addItemToCart(id: string, item: Item) {
    const cart = this.findCartById(id);
    if (!cart) {
      return null;
    }

    cart.items.push(item);

    return cart;
  }

  removeItemFromCart(cartId: string, itemId: string) {
    const cart = this.findCartById(cartId);
    if (!cart) {
      return null;
    }

    cart.items = cart.items.filter((item) => item.id !== itemId);

    return cart;
  }
}
