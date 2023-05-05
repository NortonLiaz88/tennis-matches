import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
} from '@nestjs/class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  readonly category: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  events: Array<Event>;
}

export interface Event {
  name: string;
  operation: string;
  value: string;
}
