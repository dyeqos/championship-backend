import {
  IsArray,
  IsEmail,
  IsLowercase,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { CreatePersonDto } from 'src/persons/dto/create-person.dto';
import { passwordRegex } from '../../common/constants/regex.constant';

export class CreateUserDto extends CreatePersonDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(50)
  @IsLowercase()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @Matches(passwordRegex, {
    message:
      'El password debe tener una letra mayúscula, minúscula y un número',
  })
  password: string;

  @IsOptional()
  @IsArray()
  roles: string[];
}
