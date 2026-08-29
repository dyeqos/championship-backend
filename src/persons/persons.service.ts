import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Person } from 'src/persons/entities/person.entity';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Injectable()
export class PersonsService {
  constructor(
    @InjectModel(Person.name)
    private readonly personModel: Model<Person>,
  ) {}

  async create(createUserDto: CreatePersonDto) {
    await this.validateUser(createUserDto.numberIdentifier);
    const person = await new this.personModel(createUserDto).save();
    return person;
  }

  async findOne(id: string) {
    return await this.personModel.findById(id).exec();
  }

  async findByNumberIdentifier(numberIdentifier: number) {
    const person = await this.personModel.findOne({ numberIdentifier }).exec();
    if (!person)
      throw new NotFoundException('Número de identificación no registrado');
    return person;
  }

  async update(id: string, updatePersonDto: UpdatePersonDto) {
    await this.personModel.findByIdAndUpdate(id, updatePersonDto).exec();
    return await this.personModel.findById(id).exec();
  }

  private async validateUser(numberIdentifier: number) {
    const person = await this.personModel.findOne({ numberIdentifier }).exec();
    if (person)
      throw new BadRequestException('Número de identificación ya registrado');
  }
}
