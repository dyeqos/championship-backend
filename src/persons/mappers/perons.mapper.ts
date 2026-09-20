import { Person } from '../entities/person.entity';
import { dateToString } from 'src/common/tools/utils/date.util';
import { PersonResponse } from '../interfaces/person-response.interface';

export class PersonMapper {
  static personToResponse(person: Person): PersonResponse {
    return {
      id: person._id as unknown as string,
      firstName: person.firstName,
      lastName: person.lastName,
      secondLastName: person.secondLastName,
      birthdate: dateToString(person.birthdate),
      gender: person.gender,
      numberIdentifier: person.numberIdentifier,
    };
  }

  static personListToResponse(people: Person[]): PersonResponse[] {
    return people.map((person) => this.personToResponse(person));
  }
}
