import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RpcException } from '@nestjs/microservices';
import { Player } from './interfaces/player.interface';

@Injectable()
export class PlayerService {
  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  private readonly logger = new Logger(PlayerService.name);

  async createCategory(player: Player): Promise<Player> {
    try {
      const currentCategory = new this.playerModel(player);
      return await currentCategory.save();
    } catch (err) {
      this.logger.error(`error: ${JSON.stringify(err.message)}`);
      throw new RpcException(err.message);
    }
  }

  async updateCategory(player: Player, _id: string): Promise<Player> {
    try {
      const currentCategory = await this.playerModel.findOneAndUpdate(
        { _id },
        { $set: player },
      );
      return currentCategory;
    } catch (err) {
      this.logger.error(`error: ${JSON.stringify(err.message)}`);
      throw new RpcException(err.message);
    }
  }

  async readCategories(): Promise<Player[]> {
    try {
      return await this.playerModel.find().exec();
    } catch (err) {
      this.logger.error(`error: ${JSON.stringify(err.message)}`);
      throw new RpcException(err.message);
    }
  }

  async readCategoryById(_id: string): Promise<Player> {
    try {
      const categories: Player = await this.playerModel.findOne({ _id }).exec();
      return categories;
    } catch (err) {
      this.logger.error(`error: ${JSON.stringify(err.message)}`);
      throw new RpcException(err.message);
    }
  }
}
