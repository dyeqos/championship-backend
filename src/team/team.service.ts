import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';
import { Championship } from 'src/championship/entities/championship.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectModel(Team.name)
    private readonly teamModel: Model<Team>,
    @InjectModel(Championship.name)
    private readonly championshipModel: Model<Championship>,
  ) {}

  async create(createTeamDto: CreateTeamDto) {
    const { championship } = createTeamDto;
    const championshipEntity = await this.championshipModel
      .findById(championship)
      .exec();

    console.log(createTeamDto);
    return 'This action adds a new team';
  }

  async findAll() {
    const teams = await this.teamModel.find().exec();

    return teams;
  }

  findOne(id: number) {
    return `This action returns a #${id} team`;
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`;
  }

  remove(id: number) {
    return `This action removes a #${id} team`;
  }
}
