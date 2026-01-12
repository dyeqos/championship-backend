import { Championship } from '../entities/championship.entity';
import { ParameterMapper } from 'src/parameters/mappers/parameter.mapper';
import { ChampionshipResponse } from '../interfaces/championship-response.interface';

export class ChampionshipMapper {
  static championshipToResponse(
    championship: Championship,
  ): ChampionshipResponse {
    return {
      id: championship._id as string,
      category: ParameterMapper.paramToResponse(championship.category),
      gender: championship.gender,
      management: championship.management,
      name: ParameterMapper.paramToResponse(championship.name),
      state: championship.state,
      version: championship.version,
    };
  }

  static ChampionshipListToResponse(
    championships: Championship[],
  ): ChampionshipResponse[] {
    return championships.map((championship) =>
      this.championshipToResponse(championship),
    );
  }
}
