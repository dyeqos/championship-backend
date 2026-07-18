import { Championship } from '../entities/championship.entity';
import { ParameterMapper } from 'src/parameters/mappers/parameter.mapper';
import {
  dateToString,
  getElapsedPercentage,
} from 'src/common/tools/utils/date.util';
import { ChampionshipResponse } from '../interfaces/championship-response.interface';
import { Gender } from 'src/common/enums/gender.enum';
import { ChampionshipState } from '../enums/championshipState.enum';
import { numberToRoman } from '../tools/roman-number.tool';

export class ChampionshipMapper {
  static championshipToResponse(
    championship: Championship,
  ): ChampionshipResponse {
    const {
      _id,
      category,
      dateEnd,
      dateInit,
      gender,
      management,
      name,
      totalTeams,
      version,
      state,
    } = championship;
    return {
      id: _id as unknown as string,
      category: ParameterMapper.paramToResponse(category),
      dateEnd: dateToString(dateEnd),
      dateInit: dateToString(dateInit),
      gender: gender,
      management: management,
      name: ParameterMapper.paramToResponse(name),
      state: state,
      totalTeams: totalTeams,
      version: version,
      tags: [
        gender == Gender.MALE ? 'Hombres' : 'Mujeres',
        category.name,
        'v. ' + management + '-' + numberToRoman(version),
      ],
      progress:
        state == ChampionshipState.FINISH
          ? 100
          : getElapsedPercentage(dateInit, dateEnd),
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
