import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerSchema } from './interfaces/player.schema';
import { PlayerService } from './players.service';
import { PlayerController } from './players.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Player', schema: PlayerSchema }]),
  ],
  providers: [PlayerService],
  controllers: [PlayerController],
})
export class PlayersModule {}
