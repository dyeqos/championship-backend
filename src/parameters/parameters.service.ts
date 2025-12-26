import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Parameter } from './entities/parameter.entity';
import { DomainMapper } from './mappers/domain.mapper';
import { ParameterMapper } from './mappers/parameter.mapper';
import { CreateParameterDto } from './dto/create-parameter.dto';
import { ValueDescription } from './interfaces/value-description.interface';
import { ParameterResponse } from './interfaces/parameter-response.interface';

@Injectable()
export class ParametersService {
  constructor(
    @InjectModel(Parameter.name)
    private readonly parameterModel: Model<Parameter>,
  ) {}

  async create(
    createParameterDto: CreateParameterDto,
  ): Promise<ParameterResponse> {
    //Validar que el parametro no exista el mismo value en un dominio
    const { name, domain } = createParameterDto;
    const param = await this.parameterModel.findOne({ name, domain }).exec();
    if (param) {
      throw new BadRequestException('El parametro ya se encuentra registrado');
    }
    const parameter = await new this.parameterModel(createParameterDto).save();
    return ParameterMapper.paramToResponse(parameter);
  }

  async findAll(): Promise<ParameterResponse[]> {
    const parameter = await this.parameterModel.find().exec();
    return ParameterMapper.paramListToResponse(parameter);
  }

  findOne(id: number) {
    return `This action returns a #${id} parameter`;
  }

  async findForName(name?: string): Promise<ParameterResponse[]> {
    if (!name || name.trim() === '') {
      throw new BadRequestException('El parámetro "name" es obligatorio');
    }
    const parameters = await this.parameterModel.find({ name }).exec();
    if (!parameters) {
      throw new NotFoundException(`parameter with name: ${name} not found`);
    }
    return ParameterMapper.paramListToResponse(parameters);
  }

  async findDomains(): Promise<ValueDescription[]> {
    const domains = await this.parameterModel
      .distinct('domain', { isActive: true })
      .exec();
    return DomainMapper.domainToValueDescription(domains);
  }
}
