import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Parameter } from './entities/parameter.entity';
import { DomainMapper } from './mappers/domain.mapper';
import { ParameterMapper } from './mappers/parameter.mapper';
import { CreateParameterDto } from './dto/create-parameter.dto';
import { UpdateParameterDto } from './dto/update-parameter.dto';
import { ValueDescription } from './interfaces/value-description.interface';
import { ParameterResponse } from './interfaces/parameter-response.interface';
import { State } from 'src/common/enums/state.enum';
import { FilterDomainParameterDto } from './dto/filter-domain-parameter.dto';

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

  async findForDomain(
    filterForDomain: FilterDomainParameterDto,
  ): Promise<ParameterResponse[]> {
    const mongoFilter: FilterQuery<Parameter> = {
      domain: filterForDomain.domain.toUpperCase(),
    };
    const parameters = await this.parameterModel.find(mongoFilter).exec();
    if (!parameters || parameters.length === 0) {
      throw new NotFoundException(
        `parameter with domain: ${filterForDomain.domain} not found`,
      );
    }
    return ParameterMapper.paramListToResponse(parameters);
  }

  findDomains(): ValueDescription[] {
    return DomainMapper.domainToValueDescription();
  }

  async remove(id: string): Promise<ParameterResponse> {
    const deleted = await this.parameterModel.findByIdAndUpdate(id, {
      audState: State.DELETE,
    });
    if (!deleted)
      throw new NotFoundException(`Parameter with id ${id} not found`);
    return ParameterMapper.paramToResponse(deleted);
  }

  async update(id: string, paramDto: UpdateParameterDto) {
    const updated = await this.parameterModel.findByIdAndUpdate(id, paramDto);
    if (!updated)
      throw new NotFoundException(`Parameter with id ${id} not found`);
    return ParameterMapper.paramToResponse(updated);
  }
}
