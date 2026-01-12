import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { isValidPassword } from 'src/tools/utils/encrypt.util';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthMapper } from './mapper/auth-response.interface';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}
  async login(AuthLoginDto: AuthLoginDto) {
    const { email, password } = AuthLoginDto;
    const user = await this.userModel
      .findOne({
        email,
      })
      .select('email password');
    if (!user)
      throw new UnauthorizedException('Usuario o Contraseña incorrecta');
    if (!isValidPassword(password, user.password))
      throw new UnauthorizedException('Usuario o Contraseña incorrecta');

    return {
      ...AuthMapper.authToResponse(user),
      token: this.getJwt({ email }),
    };
  }

  private getJwt(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
