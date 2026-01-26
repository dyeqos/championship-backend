import { ParameterResponse } from 'src/parameters/interfaces/parameter-response.interface';

export interface ChampionshipResponse {
  id: string;
  name: ParameterResponse;
  management: number;
  version: number;
  category: ParameterResponse;
  gender: number;
  state: number;
  dateInit: string;
  dateEnd: string;
  totalTeams: number;
}
