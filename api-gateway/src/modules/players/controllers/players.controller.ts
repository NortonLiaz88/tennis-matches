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
  Delete,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreatePlayerDto } from '../dtos/create-player.dto';
import { UpdateCategoryDto } from '../dtos/update-player.dto';
import { ClientProxySmartRanking } from 'src/proxyrmq/client-proxy';

@Controller('api/v1/players')
export class PlayerController {
  private logger = new Logger(PlayerController.name);

  constructor(private clientProxySmartRanking: ClientProxySmartRanking) {}
  private clientAdminBackend =
    this.clientProxySmartRanking.getClientProxyInstance();

  @Post()
  @UsePipes(ValidationPipe)
  createCategory(@Body() createPlayerDto: CreatePlayerDto) {
    this.clientAdminBackend.emit('create-player', createPlayerDto);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  updateCategory(
    @Body() updatePlayerDto: UpdateCategoryDto,
    @Param('id') _id: string,
  ) {
    this.clientAdminBackend.emit('update-player', {
      _id: _id,
      category: updatePlayerDto,
    });
  }

  @Get()
  readCategories(@Query('id') _id: string): Observable<any> {
    return this.clientAdminBackend.send('read-players', _id ? _id : '');
  }

  @Delete()
  deleteCategories(@Query('id') _id: string): Observable<any> {
    return this.clientAdminBackend.send('remove-players', _id ? _id : '');
  }
}
