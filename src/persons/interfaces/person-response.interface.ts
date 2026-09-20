import { Gender } from 'src/common/enums/gender.enum';

export interface PersonResponse {
  id: string;
  firstName: string;
  lastName?: string | null;
  secondLastName?: string | null;
  birthdate: string | null;
  gender: Gender;
  numberIdentifier: number;
}
