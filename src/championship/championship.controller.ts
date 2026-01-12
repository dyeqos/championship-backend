import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChampionshipService } from './championship.service';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { CreateChampionshipDto } from './dto/create-championship.dto';
import { UpdateChampionshipDto } from './dto/update-championship.dto';
import { ChampionshipResponse } from './interfaces/championship-response.interface';

@Controller('championship')
export class ChampionshipController {
  constructor(private readonly championshipService: ChampionshipService) {}

  @Post()
  create(@Body() createChampionshipDto: CreateChampionshipDto) {
    return this.championshipService.create(createChampionshipDto);
  }

  @Get()
  findAll(): Promise<ChampionshipResponse[]> {
    return this.championshipService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseMongoIdPipe) id: string,
  ): Promise<ChampionshipResponse> {
    return this.championshipService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateChampionshipDto: UpdateChampionshipDto,
  ) {
    return this.championshipService.update(+id, updateChampionshipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.championshipService.remove(+id);
  }
}
