import { User } from '../entities/user.entity';
import { dateToString, getAge } from '../../common/tools/utils/date.util';
import { UserResponse } from '../interfaces/user-response.interface';

export class UserMapper {
  static userToResponse(user: User): UserResponse {
    const birthdate = user.person?.birthdate;
    return {
      id: user._id as string,
      fullName: user.person
        ? [
            user.person.firstName,
            user.person.lastName,
            user.person.secondLastName,
          ]
            .filter(Boolean)
            .join(' ')
        : user.email,
      age: getAge(birthdate),
      birthDate: dateToString(birthdate),
      email: user.email,
      numberIdentifier: user.person?.numberIdentifier,
    };
  }

  static userListToResponse(users: User[]): UserResponse[] {
    return users.map((user) => this.userToResponse(user));
  }
}
