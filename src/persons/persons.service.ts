import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Person } from 'src/persons/entities/person.entity';
import { PersonMapper } from './mappers/perons.mapper';
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
    return PersonMapper.personToResponse(person);
  }

  async findOne(id: string) {
    const person = await this.personModel.findById(id).exec();
    if (!person) throw new NotFoundException('Persona no encontrada');
    return PersonMapper.personToResponse(person);
  }

  async findByNumberIdentifier(numberIdentifier: number) {
    const person = await this.personModel.findOne({ numberIdentifier }).exec();
    if (!person) throw new NotFoundException('Persona no encontrada');
    return PersonMapper.personToResponse(person);
  }

  async update(id: string, updatePersonDto: UpdatePersonDto) {
    await this.personModel.findByIdAndUpdate(id, updatePersonDto).exec();
    const person = await this.personModel.findById(id).exec();
    if (!person) throw new NotFoundException('Persona no encontrada');
    return PersonMapper.personToResponse(person);
  }

  private async validateUser(numberIdentifier: number) {
    const person = await this.personModel.findOne({ numberIdentifier }).exec();
    if (person)
      throw new BadRequestException('Número de identificación ya registrado');
  }
}
