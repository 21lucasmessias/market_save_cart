import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Cart } from 'src/cart/entities/cart.entity';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { AddItemDto } from '../../src/cart/dto/add-item.dto';
import { CreateCartDto } from '../../src/cart/dto/create-cart.dto';
import { InMemoryDatabase } from '../../src/database/in-memory-database';

describe('CartController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [InMemoryDatabase],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/cart (POST)', () => {
    const createCartDto: CreateCartDto = {
      name: 'Test Cart',
      items: [],
    };
    return request(app.getHttpServer())
      .post('/cart')
      .send(createCartDto)
      .expect(201)
      .expect((res) => {
        expect((res.body as Cart).name).toBe(createCartDto.name);
        expect(Array.isArray((res.body as Cart).items)).toBe(true);
      });
  });

  it('/cart (GET)', () => {
    return request(app.getHttpServer())
      .get('/cart')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
      });
  });

  it('/cart/:id (GET)', async () => {
    const createCartDto: CreateCartDto = {
      name: 'Test Cart',
      items: [],
    };
    const body = await request(app.getHttpServer())
      .post('/cart')
      .send(createCartDto);
    const createdCart = body.body as Cart;

    return request(app.getHttpServer())
      .get(`/cart/${createdCart.cartId}`)
      .expect(200)
      .expect((res) => {
        expect((res.body as Cart).name).toBe(createCartDto.name);
        expect((res.body as Cart).cartId).toBe(createdCart.cartId);
        expect((res.body as Cart).items).toEqual(createCartDto.items);
      });
  });

  it('/cart/:id (PATCH)', async () => {
    const createCartDto: CreateCartDto = {
      name: 'Test Cart',
      items: [],
    };
    const body = await request(app.getHttpServer())
      .post('/cart')
      .send(createCartDto);
    const createdCart = body.body as Cart;

    const updateCartDto = { name: 'Updated Cart' };
    return request(app.getHttpServer())
      .patch(`/cart/${createdCart.cartId}`)
      .send(updateCartDto)
      .expect(200)
      .expect((res) => {
        expect((res.body as Cart).name).toBe(updateCartDto.name);
        expect((res.body as Cart).cartId).toBe(createdCart.cartId);
        expect((res.body as Cart).items).toEqual(createCartDto.items);
      });
  });

  it('/cart/:id (DELETE)', async () => {
    const createCartDto: CreateCartDto = {
      name: 'Test Cart',
      items: [],
    };
    const body = await request(app.getHttpServer())
      .post('/cart')
      .send(createCartDto);
    const createdCart = body.body as Cart;

    return request(app.getHttpServer())
      .delete(`/cart/${createdCart.cartId}`)
      .expect(200);
  });

  it('/cart/:id/addItem (POST)', async () => {
    const createCartDto: CreateCartDto = {
      name: 'Test Cart',
      items: [],
    };
    const body = await request(app.getHttpServer())
      .post('/cart')
      .send(createCartDto);
    const createdCart = body.body as Cart;

    const addItemDto: AddItemDto = { name: 'Test Item', quantity: 1 };
    return request(app.getHttpServer())
      .post(`/cart/${createdCart.cartId}/addItem`)
      .send(addItemDto)
      .expect(201)
      .expect((res) => {
        expect((res.body as Cart).items.length).toBe(1);
        expect((res.body as Cart).items[0].name).toBe(addItemDto.name);
        expect((res.body as Cart).items[0].id).toBeDefined();
      });
  });

  it('/cart/:cartId/removeItem/:itemId (DELETE)', async () => {
    const createCartDto: CreateCartDto = {
      name: 'Test Cart',
      items: [],
    };
    const bodyCreate = await request(app.getHttpServer())
      .post('/cart')
      .send(createCartDto);
    const createdCart = bodyCreate.body as Cart;

    const addItemDto: AddItemDto = { name: 'Test Item', quantity: 1 };
    const bodyAddItem = await request(app.getHttpServer())
      .post(`/cart/${createdCart.cartId}/addItem`)
      .send(addItemDto);
    const updatedCart = bodyAddItem.body as Cart;

    const itemId = updatedCart.items[0].id;
    return request(app.getHttpServer())
      .delete(`/cart/${createdCart.cartId}/removeItem/${itemId}`)
      .expect(200)
      .expect((res) => {
        expect((res.body as Cart).items.length).toBe(0);
      });
  });
});
