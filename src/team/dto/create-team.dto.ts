import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsNumber,
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
  @IsNumber()
  numberIdentifier!: number;

  @IsNotEmpty()
  @IsMongoId()
  championshipId!: string;

  @IsOptional()
  @IsEnum(TeamState)
  state?: TeamState;

  @IsOptional()
  @IsMongoId()
  color?: string;
}
