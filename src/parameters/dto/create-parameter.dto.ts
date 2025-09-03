import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { Name } from '../enums/name.enum';

export class CreateParameterDto {
  @IsNotEmpty()
  @IsEnum(Name)
  name: Name;

  @IsNumber()
  @Min(0)
  value: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  description: string;
}
