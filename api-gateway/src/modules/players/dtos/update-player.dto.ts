import { IsOptional } from '@nestjs/class-validator';

export class UpdateCategoryDto {
  @IsOptional()
  category?: string;

  @IsOptional()
  pictureUrl?: string;
}
