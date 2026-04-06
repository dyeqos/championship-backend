import {
  IsEmail,
  IsLowercase,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { passwordRegex } from '../../common/constants/regex.constant';

export class RegisterLoginDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(50)
  @IsLowercase()
  email!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @Matches(passwordRegex, {
    message:
      'El password debe tener una letra mayúscula, minúscula y un número',
  })
  password!: string;
}
