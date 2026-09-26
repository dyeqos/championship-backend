import { TeamState } from '../enums/team-state.enum';
import { PersonResponse } from 'src/persons/interfaces/person-response.interface';
import { ChampionshipResponse } from 'src/championship/interfaces/championship-response.interface';
import { ParameterResponse } from 'src/parameters/interfaces/parameter-response.interface';

export interface TeamResponse {
  id: string;
  name: string;
  teamUser: PersonResponse;
  championship: ChampionshipResponse;
  color: ParameterResponse | null;
  state: TeamState;
}
