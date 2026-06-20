import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Championship } from './entities/championship.entity';
import { CreateChampionshipDto } from './dto/create-championship.dto';
import { UpdateChampionshipDto } from './dto/update-championship.dto';
import { FilterChampionshipDto } from './dto/filter-championship.dto';
import { isBeforeToday } from 'src/common/tools/validations/date.validation';
import { ChampionshipMapper } from './mappers/championship.mapper';
import { ChampionshipResponse } from './interfaces/championship-response.interface';

@Injectable()
export class ChampionshipService {
  constructor(
    @InjectModel(Championship.name)
    private readonly championshipModel: Model<Championship>,
  ) {}

  async create(
    createChampionshipDto: CreateChampionshipDto,
  ): Promise<ChampionshipResponse> {
    // validar si ya esta registrado el torneo
    const { name, management, category, gender, dateInit } =
      createChampionshipDto;

    const isBefore = isBeforeToday(dateInit);

    if (isBefore) {
      throw new BadRequestException(
        `La fecha ${dateInit} es anterior a la fecha actual. Por favor, proporcione una fecha válida.`,
      );
    }

    const result = await this.championshipModel
      .findOne({
        name,
        management,
        category,
        gender,
      })
      .sort({ version: -1 })
      .exec();
    //agrega la version
    createChampionshipDto.version = result?.version ? ++result.version : 1;
    const championship = await new this.championshipModel(
      createChampionshipDto,
    ).save();
    console.log(championship);
    return ChampionshipMapper.championshipToResponse(championship);
  }

  async findAll(
    filterDTO: FilterChampionshipDto,
  ): Promise<ChampionshipResponse[]> {
    const mongoFilter: FilterQuery<Championship> = {};
    const { category, management, state, name } = filterDTO;
    if (name) mongoFilter.name = name;
    if (management) mongoFilter.management = management;
    if (category) mongoFilter.category = category;
    if (state) mongoFilter.state = state;

    const championships = await this.championshipModel.find(mongoFilter).exec();
    return ChampionshipMapper.ChampionshipListToResponse(championships);
  }

  async findOne(id: string): Promise<ChampionshipResponse> {
    const championship = await this.championshipModel.findById(id).exec();
    if (!championship) {
      throw new NotFoundException(`Championship with id ${id} not found`);
    }
    return ChampionshipMapper.championshipToResponse(championship);
  }

  update(id: number, updateChampionshipDto: UpdateChampionshipDto) {
    return `This action updates a #${id} ${updateChampionshipDto.category} championship`;
  }

  remove(id: number) {
    return `This action removes a #${id} championship`;
  }
}
