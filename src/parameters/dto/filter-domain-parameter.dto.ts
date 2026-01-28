import { IsNotEmpty, IsString } from 'class-validator';

export class FilterDomainParameterDto {
  @IsNotEmpty()
  @IsString()
  domain: string;
}
