import { ParamDomain } from '../enums/paramDomain.enum';
import { ValueDescription } from '../interfaces/value-description.interface';

export class DomainMapper {
  private static readonly domainMap = new Map<ParamDomain, string>([
    [ParamDomain.CATEGORY, 'Categoría'],
    [ParamDomain.CHAMPIONSHIP, 'Campeonato'],
  ]);

  static domainToValueDescription(domains: ParamDomain[]): ValueDescription[] {
    return domains.map((domain) => ({
      value: domain,
      description: this.domainMap.get(domain) ?? '',
    }));
  }
}
