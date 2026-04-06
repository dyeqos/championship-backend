import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import {
  encryptPassword,
  isValidPassword,
} from 'src/common/tools/utils/encrypt.util';
import { AuthLoginDto } from './dto/auth-login.dto';
import { RegisterLoginDto } from './dto/register-login.dto';
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

  async register(registerLoginDto: RegisterLoginDto) {
    const { email, password } = registerLoginDto;
    const user = await this.userModel.findOne({ email }).exec();
    if (user) throw new BadRequestException('Email ya registrado');
    try {
      const userData = {
        email: email.toLowerCase(),
        password: encryptPassword(password),
      };
      const user = await new this.userModel(userData).save();
      if (user) return { isCreated: true };
      return { isCreated: true };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Revise los logs');
    }
  }

  private getJwt(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
