import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Championship } from './entities/championship.entity';
import { CreateChampionshipDto } from './dto/create-championship.dto';
import { UpdateChampionshipDto } from './dto/update-championship.dto';

@Injectable()
export class ChampionshipService {
  constructor(
    @InjectModel(Championship.name)
    private readonly championshipModel: Model<Championship>,
  ) {}

  async create(
    createChampionshipDto: CreateChampionshipDto,
  ): Promise<Championship> {
    const championship = new this.championshipModel(createChampionshipDto);
    return championship.save();
  }

  async findAll(): Promise<Championship[]> {
    return this.championshipModel.find().exec();
  }

  async findOne(id: string): Promise<Championship> {
    const championship = await this.championshipModel.findById(id).exec();
    if (!championship) {
      throw new NotFoundException(`Championship with id ${id} not found`);
    }
    return championship;
  }

  update(id: number, updateChampionshipDto: UpdateChampionshipDto) {
    return `This action updates a #${id} championship`;
  }

  remove(id: number) {
    return `This action removes a #${id} championship`;
  }
}
