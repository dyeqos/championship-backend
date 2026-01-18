import { dateToString, getAge } from 'src/common/tools/utils/date.util';
import { User } from '../entities/user.entity';
import { UserResponse } from '../interfaces/user-response.interface';

export class UserMapper {
  static userToResponse(user: User): UserResponse {
    const birthdate = user.person.birthdate;
    return {
      id: user._id as string,
      fullName: [
        user.person.firstName,
        user.person.lastName,
        user.person.secondLastName,
      ]
        .filter(Boolean)
        .join(' '),
      age: getAge(birthdate),
      birthDate: dateToString(birthdate),
      email: user.email,
    };
  }

  static userListToResponse(users: User[]): UserResponse[] {
    return users.map((user) => this.userToResponse(user));
  }
}
