import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoriesModule } from './categories/categories.module';
import { PlayersModule } from './players/players.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017/matches-admin'),
    CategoriesModule,
    PlayersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
