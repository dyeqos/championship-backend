import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { ParametersService } from './parameters.service';
import { CreateParameterDto } from './dto/create-parameter.dto';
import { UpdateParameterDto } from './dto/update-parameter.dto';
import { FilterDomainParameterDto } from './dto/filter-domain-parameter.dto';

@Controller('parameters')
export class ParametersController {
  constructor(private readonly parametersService: ParametersService) {}

  @Post()
  create(@Body() createParameterDto: CreateParameterDto) {
    return this.parametersService.create(createParameterDto);
  }

  @Get()
  findForDomain(@Query() filterForDomain: FilterDomainParameterDto) {
    return this.parametersService.findForDomain(filterForDomain);
  }

  @Get('all')
  findAll() {
    return this.parametersService.findAll();
  }

  @Get('domains')
  findDomains() {
    return this.parametersService.findDomains();
  }

  @Get()
  findOne(@Param(':id') id: string) {
    return this.parametersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateParameterDto: UpdateParameterDto,
  ) {
    return this.parametersService.update(id, updateParameterDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.parametersService.remove(id);
  }
}
