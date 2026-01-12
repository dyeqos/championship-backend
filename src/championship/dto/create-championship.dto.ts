import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Matches,
} from 'class-validator';
import { STRING_DATE_REGEX } from 'src/constants/regex.constant';
import { ChampionshipState } from '../enums/championshipState.enum';
import { Gender } from 'src/common/enums/gender.enum';

export class CreateChampionshipDto {
  @IsMongoId()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  management: number;

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
