import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { Team } from './entities/team.entity';
import { Person } from 'src/persons/entities/person.entity';
import { Championship } from '../championship/entities/championship.entity';
import { ChampionshipState } from '../championship/enums/championshipState.enum';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamMapper } from './mappers/team.mapper';
import { FilterTeamDto } from './dto/filter-team.dto';

@Injectable()
export class TeamService {
  constructor(
    @InjectModel(Team.name)
    private readonly teamModel: Model<Team>,
    @InjectModel(Championship.name)
    private readonly championshipModel: Model<Championship>,
    @InjectModel(Person.name)
    private readonly personModel: Model<Person>,
  ) {}

  async create(createTeamDto: CreateTeamDto) {
    console.log(createTeamDto);
    const { championshipId, personId, ...teamData } = createTeamDto;
    const championshipEntity = await this.championshipModel
      .findById(championshipId)
      .exec();
    if (!championshipEntity)
      throw new BadRequestException('El campeonato no existe');
    if (championshipEntity.state != ChampionshipState.DRAFT)
      throw new BadRequestException('El campeonato esta en curso o finalizado');
    const personEntity = await this.personModel.findById(personId).exec();
    if (!personEntity) throw new BadRequestException('El usuario no existe');
    try {
      const teamEntity = await new this.teamModel({
        ...teamData,
        teamUser: personEntity,
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

  async findAll(params: FilterTeamDto) {
    const { championshipId, state, management } = params;
    const teamFilter: FilterQuery<Team> = {};
    // const teamFilter: Record<string, any> = {};

    if (championshipId || (management !== undefined && management !== null)) {
      const championshipFilter: FilterQuery<Championship> = {};
      if (championshipId) {
        championshipFilter._id = new Types.ObjectId(championshipId);
      }
      if (management !== undefined && management !== null) {
        championshipFilter.management = management;
      }

      const championships = await this.championshipModel
        .find(championshipFilter)
        .select('_id')
        .lean()
        .exec();
      teamFilter.championship = {
        $in: championships.map((championship) => championship._id),
      };
    }

    if (state) {
      teamFilter.state = state;
    }

    const teams = await this.teamModel
      .find(teamFilter)
      .populate('teamUser championship')
      .exec();
    return TeamMapper.TeamListToResponse(teams);
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
