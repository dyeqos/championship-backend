import { PersonMapper } from 'src/persons/mappers/perons.mapper';
import { Team } from '../entities/team.entity';
import { TeamResponse } from '../interfaces/team-response.interface';
import { ChampionshipMapper } from 'src/championship/mappers/championship.mapper';
import { ParameterMapper } from 'src/parameters/mappers/parameter.mapper';

export class TeamMapper {
  static TeamMapper(team: Team): TeamResponse {
    return {
      id: team._id as unknown as string,
      name: team.name,
      teamUser: PersonMapper.personToResponse(team.teamUser),
      championship: ChampionshipMapper.championshipToResponse(
        team.championship,
      ),
      color: team.color ? ParameterMapper.paramToResponse(team.color) : null,
      state: team.state,
    };
  }

  static TeamListToResponse(teams: Team[]): TeamResponse[] {
    return teams.map((team) => this.TeamMapper(team));
  }
}
