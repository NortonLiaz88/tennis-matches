import { Controller, Logger } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CategoryService } from './categories.service';
import { Category } from './interfaces/category.interface';

const ackErrors: string[] = ['E11000'];

@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  private readonly logger = new Logger(CategoryController.name);

  @EventPattern('create-category')
  async createCategory(
    @Payload() category: Category,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    this.logger.log(`data: ${JSON.stringify(category)}`);

    try {
      await this.categoryService.createCategory(category);
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

  @EventPattern('update-category')
  async updateCategory(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    this.logger.log(`data: ${JSON.stringify(data.category)}`);

    try {
      await this.categoryService.updateCategory(data.category, data.id);
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

  @MessagePattern('read-categories')
  async readCategories(@Payload() _id: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    try {
      if (_id) {
        this.logger.log(`category: ${JSON.stringify(_id)}`);
        const category = await this.categoryService.readCategoryById(_id);
        return category;
      } else {
        const categories = await this.categoryService.readCategories();
        return categories;
      }
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.mesage)}`);
    } finally {
      await channel.ack(message);
    }
  }
}
