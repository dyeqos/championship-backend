import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Controller('persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @Post()
  async create(@Body() createPersonDto: CreatePersonDto) {
    return this.personsService.create(createPersonDto);
  }

  @Get()
  findByNumberIdentifier(@Query('numberIdentifier') numberIdentifier: string) {
    return this.personsService.findByNumberIdentifier(Number(numberIdentifier));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personsService.update(id, updatePersonDto);
  }
}
