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
import { ChampionshipMapper } from './mappers/championship.mapper';
import { isDateBefore, stringToDate } from 'src/common/tools/utils/date.util';
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

    if (isDateBefore(dateInit, new Date())) {
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
    const { _id } = await new this.championshipModel({
      ...createChampionshipDto,
      version: result?.version ? ++result.version : 1,
      dateInit: stringToDate(dateInit),
    }).save();
    const entity = await this.championshipModel.findById(_id);
    if (!entity)
      throw new BadRequestException(`No se pudo registrar el campeonato.`);
    return ChampionshipMapper.championshipToResponse(entity);
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
