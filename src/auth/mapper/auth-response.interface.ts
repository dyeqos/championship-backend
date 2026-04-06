import { User } from 'src/users/entities/user.entity';

export class AuthMapper {
  static authToResponse(user: User) {
    return {
      email: user.email,
      fullName: user.person
        ? [
            user.person.firstName,
            user.person.lastName,
            user.person.secondLastName,
          ]
            .filter(Boolean)
            .join(' ')
        : user.email,
      roles: user.roles,
    };
  }
}
