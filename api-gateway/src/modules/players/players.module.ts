import { Module } from '@nestjs/common';
import { ProxyRMQModule } from 'src/proxyrmq/proxyrmq.module';
import { PlayerController } from './controllers/players.controller';

@Module({
  imports: [ProxyRMQModule],
  controllers: [PlayerController],
})
export class PlayersModule {}
