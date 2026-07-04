import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import { TeamState } from '../enums/team-state.enum';

export class CreateTeamDto {
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(3)
  name!: string;

  @IsNotEmpty()
  @IsMongoId()
  teamUser!: string;

  @IsNotEmpty()
  @IsMongoId()
  championship!: string;

  @IsOptional()
  @IsEnum(TeamState)
  state?: TeamState;

  @IsOptional()
  @IsMongoId()
  color?: string;
}
