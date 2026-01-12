import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { StringToDate } from 'src/common/decorators/string-to-date.decorator';
import { Gender } from 'src/common/enums/gender.enum';

export class CreatePersonDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  firstName: string;

  @ValidateIf((o: CreatePersonDto) => !o.secondLastName)
  @MinLength(3)
  @MaxLength(50)
  lastName: string;

  @ValidateIf((o: CreatePersonDto) => !o.lastName)
  @MinLength(3)
  @MaxLength(50)
  secondLastName: string;

  @StringToDate()
  @IsDate()
  birthdate: Date;

  @IsNumber()
  @IsNotEmpty()
  numberIdentifier: number;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;
}
