import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Person } from 'src/persons/entities/person.entity';
import { User } from './entities/user.entity';
import { encryptPassword } from 'src/tools/utils/encrypt.util';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Person.name)
    private readonly personModel: Model<Person>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password, ...personData } = createUserDto;
    await this.validateUser(personData.numberIdentifier, email);
    try {
      const person = await new this.personModel(personData).save();
      const userData = {
        email: email.toLowerCase(),
        password: encryptPassword(password),
        person: person._id,
      };
      const user = await new this.userModel(userData).save();
      return user;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Revise los logs');
    }
  }

  private async validateUser(numberIdentifier: number, email: string) {
    const person = await this.personModel.findOne({ numberIdentifier }).exec();
    if (person)
      throw new BadRequestException('Número de identificación ya registrado');
    const user = await this.userModel.findOne({ email }).exec();
    if (user) throw new BadRequestException('Email ya registrado');
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return `This action updates a #${id}  user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
