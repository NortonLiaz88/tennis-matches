import {
  ArrayMinSize,
  IsArray,
  IsOptional,
  IsString,
} from '@nestjs/class-validator';
import { Event } from './create-category.dto';

export class UpdateCategoryDto {
  @IsString()
  @IsOptional()
  descriptions: string;

  @IsArray()
  @ArrayMinSize(1)
  events: Array<Event>;
}
