import {
  Body,
  Controller,
  Logger,
  Post,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
  Param,
  Put,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { ClientProxySmartRanking } from 'src/proxyrmq/client-proxy';

@Controller('api/v1/categories')
export class CategoryController {
  private logger = new Logger(CategoryController.name);
  constructor(private clientProxySmartRanking: ClientProxySmartRanking) {}
  private clientAdminBackend =
    this.clientProxySmartRanking.getClientProxyInstance();

  @Post()
  @UsePipes(ValidationPipe)
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    this.clientAdminBackend.emit('create-category', createCategoryDto);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  updateCategory(
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Param('id') _id: string,
  ) {
    this.clientAdminBackend.emit('update-category', {
      _id: _id,
      category: updateCategoryDto,
    });
  }

  @Get()
  readCategories(@Query('id') _id: string): Observable<any> {
    return this.clientAdminBackend.send('read-categories', _id ? _id : '');
  }
}
