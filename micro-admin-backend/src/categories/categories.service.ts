import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RpcException } from '@nestjs/microservices';
import { Category } from './interfaces/category.interface';
import { Player } from 'src/players/interfaces/player.interface';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  private readonly logger = new Logger(CategoryService.name);

  async createCategory(category: Category): Promise<Category> {
    try {
      const currentCategory = new this.categoryModel(category);
      return await currentCategory.save();
    } catch (err) {
      this.logger.error(`error: ${JSON.stringify(err.message)}`);
      throw new RpcException(err.message);
    }
  }

  async updateCategory(category: Category, _id: string): Promise<Category> {
    try {
      const currentCategory = await this.categoryModel.findOneAndUpdate(
        { _id },
        { $set: category },
      );
      return currentCategory;
    } catch (err) {
      this.logger.error(`error: ${JSON.stringify(err.message)}`);
      throw new RpcException(err.message);
    }
  }

  async readCategories(): Promise<Category[]> {
    try {
      return await this.categoryModel.find().exec();
    } catch (err) {
      this.logger.error(`error: ${JSON.stringify(err.message)}`);
      throw new RpcException(err.message);
    }
  }

  async readCategoryById(_id: string): Promise<Category> {
    try {
      const categories: Category = await this.categoryModel
        .findOne({ _id })
        .exec();
      return categories;
    } catch (err) {
      this.logger.error(`error: ${JSON.stringify(err.message)}`);
      throw new RpcException(err.message);
    }
  }
}
