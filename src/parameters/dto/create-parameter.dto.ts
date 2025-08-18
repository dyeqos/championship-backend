import { IsNumber, IsString, Min, MinLength } from 'class-validator';

export class CreateParameterDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsNumber()
  @Min(0)
  value: number;

  @IsString()
  @MinLength(3)
  description: string;
}
