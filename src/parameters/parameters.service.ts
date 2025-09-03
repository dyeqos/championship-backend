import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Parameter } from './entities/parameter.entity';
import { CreateParameterDto } from './dto/create-parameter.dto';
import { UpdateParameterDto } from './dto/update-parameter.dto';

@Injectable()
export class ParametersService {
  constructor(
    @InjectModel(Parameter.name)
    private readonly parameterModel: Model<Parameter>,
  ) {}

  async create(createParameterDto: CreateParameterDto) {
    //Validar que el parametro no exista el mismo value en un dominio
    const { name, value } = createParameterDto;
    const param = await this.parameterModel.findOne({ name, value }).exec();
    if (param) {
      throw new BadRequestException('El parametro ya se encuentra registrado');
    }
    const parameter = new this.parameterModel(createParameterDto);
    return parameter.save();
  }

  async findAll() {
    return await this.parameterModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} parameter`;
  }

  async findForName(name?: string) {
    if (!name || name.trim() === '') {
      throw new BadRequestException('El parámetro "name" es obligatorio');
    }
    const parameters = await this.parameterModel.find({ name }).exec();
    if (!parameters) {
      throw new NotFoundException(`parameter with name: ${name} not found`);
    }
    return parameters;
  }

  async findNames() {
    return this.parameterModel.distinct('name').exec();
  }

  update(id: number, updateParameterDto: UpdateParameterDto) {
    return `This action updates a #${id} parameter`;
  }

  remove(id: number) {
    return `This action removes a #${id} parameter`;
  }
}
