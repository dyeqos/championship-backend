import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Team } from './entities/team.entity';
import { User } from '../users/entities/user.entity';
import { Championship } from '../championship/entities/championship.entity';
import { ChampionshipState } from '../championship/enums/championshipState.enum';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamService {
  constructor(
    @InjectModel(Team.name)
    private readonly teamModel: Model<Team>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(Championship.name)
    private readonly championshipModel: Model<Championship>,
  ) {}

  async create(createTeamDto: CreateTeamDto) {
    const { championship, teamUser, ...teamData } = createTeamDto;
    const championshipEntity = await this.championshipModel
      .findById(championship)
      .exec();
    if (!championshipEntity)
      throw new BadRequestException('El campeonato no existe');
    if (championshipEntity.state != ChampionshipState.DRAFT)
      throw new BadRequestException('El campeonato esta en curso o finalizado');
    const userEntity = await this.userModel.findById(teamUser).exec();
    if (!userEntity) throw new BadRequestException('El usuario no existe');
    try {
      const teamEntity = await new this.teamModel({
        ...teamData,
        teamUser: userEntity,
        championship: championshipEntity,
      }).save();
      return this.teamModel
        .findById(teamEntity.id)
        .populate('teamUser championship')
        .exec();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al registrar el equipo');
    }
  }

  async findAll() {
    const teams = await this.teamModel
      .find()
      .populate('teamUser championship')
      .exec();
    return teams;
  }

  async findTeamsByChampionship(championshipId: string) {
    const championship = new Types.ObjectId(championshipId);
    const teams = await this.teamModel
      .find({ championship })
      .populate('teamUser championship')
      .exec();
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
