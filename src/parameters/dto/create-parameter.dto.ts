import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { ParamDomain } from '../enums/param-domain.enum';

export class CreateParameterDto {
  @IsNotEmpty()
  @IsEnum(ParamDomain)
  domain: ParamDomain;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
}
