import { ParamDomain } from '../enums/param-domain.enum';
import { ValueDescription } from '../interfaces/value-description.interface';

export class DomainMapper {
  private static readonly domainMap = new Map<ParamDomain, string>([
    [ParamDomain.CATEGORY, 'Categoría'],
    [ParamDomain.CHAMPIONSHIP, 'Campeonato'],
    [ParamDomain.COLOR, 'Color'],
  ]);

  static domainToValueDescription(): ValueDescription[] {
    return Object.values(ParamDomain).map((value) => ({
      value,
      description: this.domainMap.get(value) ?? '',
    }));
  }
}
