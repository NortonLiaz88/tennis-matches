import { IsNotEmpty } from '@nestjs/class-validator';
import { IsEmail } from 'class-validator';

export class CreatePlayerDto {
  @IsNotEmpty()
  readonly phoneNumber: string;
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly category: string;
}
