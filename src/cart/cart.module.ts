import { Module } from '@nestjs/common';
import { InMemoryDatabase } from '../database/in-memory-database';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

@Module({
  controllers: [CartController],
  providers: [CartService, InMemoryDatabase],
})
export class CartModule {}
