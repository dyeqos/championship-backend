import { IsEnum, IsMongoId, IsNumber, IsOptional } from 'class-validator';
import { ChampionshipState } from '../enums/championshipState.enum';
import { Type } from 'class-transformer';

export class FilterChampionshipDto {
  @IsOptional()
  @IsMongoId()
  name?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  management?: number;

  @IsOptional()
  @IsMongoId()
  category?: string;

  @IsOptional()
  @Type(() => Number)
  @IsEnum(ChampionshipState)
  state?: ChampionshipState;
}
