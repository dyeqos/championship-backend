/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { Gender } from '../enums/gender.enum';
export class CreateChampionshipDto {
  @IsNumber()
  @IsNotEmpty()
  name: number;

  @IsNumber()
  @IsNotEmpty()
  gestion: number;

  @IsNumber()
  @IsNotEmpty()
  version: number;

  @IsNumber()
  @IsNotEmpty()
  category: number;

  @IsEnum(Gender)
  gender: Gender;
}
