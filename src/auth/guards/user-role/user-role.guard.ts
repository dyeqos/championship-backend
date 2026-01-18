import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLE } from 'src/auth/decorators/role-protected.decorator';
import { User } from 'src/users/entities/user.entity';

interface RequestWithUser extends Request {
  user: User;
}

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.get(
      META_ROLE,
      context.getHandler(),
    );
    if (!validRoles || validRoles.length == 0) return true;
    const { user } = context.switchToHttp().getRequest<RequestWithUser>();

    if (!user) throw new BadRequestException('User not found');
    for (const role of user.roles) {
      if (validRoles.includes(role)) {
        return true;
      }
    }
    throw new ForbiddenException(`Usuario sin accesos válidos`);
  }
}
