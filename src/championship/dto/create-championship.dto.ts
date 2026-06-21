import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Matches,
} from 'class-validator';
import { stringDateRegex } from 'src/common/constants/regex.constant';
import { ChampionshipState } from '../enums/championshipState.enum';
import { Gender } from 'src/common/enums/gender.enum';

export class CreateChampionshipDto {
  @IsMongoId()
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  @IsNumber()
  management!: number;

  @IsOptional()
  @IsNumber()
  version?: number;

  @IsNotEmpty()
  @IsMongoId()
  category!: string;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender!: Gender;

  @IsNotEmpty()
  @Matches(stringDateRegex, {
    message: 'Formato inválido, debe ser DD/MM/AAAA',
  })
  dateInit!: string;

  @IsOptional()
  @Matches(stringDateRegex, {
    message: 'Formato inválido, debe ser DD/MM/YYYY',
  })
  dateFinish?: string;

  @IsOptional()
  @IsEnum(ChampionshipState)
  state?: ChampionshipState;
}
