import { Module } from '@nestjs/common';
import { ProxyRMQModule } from './proxyrmq/proxyrmq.module';
import { ClientProxySmartRanking } from './proxyrmq/client-proxy';
import { CategoryModule } from './modules/categories/categories.module';
import { PlayersModule } from './modules/players/players.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ProxyRMQModule,
    CategoryModule,
    PlayersModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  providers: [ClientProxySmartRanking],
})
export class AppModule {}
