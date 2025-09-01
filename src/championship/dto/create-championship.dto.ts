import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Matches,
} from 'class-validator';
import { Gender } from '../enums/gender.enum';
import { STRING_DATE_REGEX } from 'src/constants/regex.constant';
import { ChampionshipState } from '../enums/championshipState.enum';
export class CreateChampionshipDto {
  @IsMongoId()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  gestion: number;

  @IsNumber()
  @IsOptional()
  version?: number;

  @IsMongoId()
  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @IsOptional()
  @Matches(STRING_DATE_REGEX, {
    message: 'Formato inválido, debe ser DD/MM/YYYY',
  })
  dateInit?: string;

  @IsOptional()
  @Matches(STRING_DATE_REGEX, {
    message: 'Formato inválido, debe ser DD/MM/YYYY',
  })
  dateFinish?: string;

  @IsOptional()
  @IsEnum(ChampionshipState)
  state?: ChampionshipState;
}
