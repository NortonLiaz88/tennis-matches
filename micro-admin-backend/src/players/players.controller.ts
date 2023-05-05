import { Controller, Logger } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { PlayerService } from './players.service';
import { Player } from './interfaces/player.interface';

const ackErrors: string[] = ['E11000'];

@Controller()
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  private readonly logger = new Logger(PlayerController.name);

  @EventPattern('create-player')
  async createCategory(@Payload() player: Player, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    this.logger.log(`data: ${JSON.stringify(player)}`);

    try {
      await this.playerService.createCategory(player);
      await channel.ack(originalMsg);
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`);

      ackErrors.forEach(async (ackError) => {
        if (error.message.includes(ackError)) {
          await channel.ack(originalMsg);
        }
      });
    }
  }

  @EventPattern('update-player')
  async updateCategory(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    this.logger.log(`data: ${JSON.stringify(data.player)}`);

    try {
      await this.playerService.updateCategory(data.player, data.id);
      await channel.ack(originalMsg);
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`);

      ackErrors.forEach(async (ackError) => {
        if (error.message.includes(ackError)) {
          await channel.ack(originalMsg);
        }
      });
    }
  }

  @MessagePattern('read-players')
  async readCategories(@Payload() _id: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    try {
      if (_id) {
        this.logger.log(`player: ${JSON.stringify(_id)}`);
        const player = await this.playerService.readCategoryById(_id);
        return player;
      } else {
        const categories = await this.playerService.readCategories();
        return categories;
      }
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.mesage)}`);
    } finally {
      await channel.ack(message);
    }
  }
}
