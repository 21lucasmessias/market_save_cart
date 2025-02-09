import { Module } from '@nestjs/common';
import { CartModule } from './cart/cart.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [CartModule, DatabaseModule],
})
export class AppModule {}
