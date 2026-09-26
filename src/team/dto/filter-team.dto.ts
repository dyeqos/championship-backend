import { IsEnum, IsMongoId, IsNumber, IsOptional } from 'class-validator';
import { TeamState } from '../enums/team-state.enum';
import { Type } from 'class-transformer';

export class FilterTeamDto {
  @IsOptional()
  @IsMongoId()
  championshipId?: string | null;

  @IsOptional()
  @Type(() => Number)
  @IsEnum(TeamState)
  state?: TeamState | null;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  management?: number | null;
}
