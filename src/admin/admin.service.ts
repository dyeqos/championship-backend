import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { Person } from 'src/persons/entities/person.entity';
import { Parameter } from 'src/parameters/entities/parameter.entity';
import { Gender } from 'src/common/enums/gender.enum';
import { ValidRoles } from 'src/auth/enum/valid-roles.enum';
import { ParamDomain } from 'src/parameters/enums/param-domain.enum';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(Person.name)
    private readonly personModel: Model<Person>,
    @InjectModel(Parameter.name)
    private readonly parameterModel: Model<Parameter>,
  ) {}

  async seed() {
    const users = await this.userModel.find().exec();
    if (users.length > 0)
      throw new InternalServerErrorException('No se puede ejecutar SEED');
    const parameters = await this.parameterModel.find().exec();
    if (parameters.length > 0)
      throw new InternalServerErrorException('No se puede ejecutar SEED');
    //Crear Persona
    const person = await new this.personModel({
      firstName: 'Diego Mijail',
      lastName: 'Calvi',
      secondLastName: 'Luna',
      numberIdentifier: 6769227,
      birthdate: new Date(1991, 9, 28),
      gender: Gender.MALE,
    }).save();
    //Crear Usuario
    await new this.userModel({
      email: 'dyeqos@gmail.com',
      password: '12345',
      person,
      roles: [ValidRoles.SUPER_ADMIN],
    }).save();
    //Parámetros Seed
    await this.parameterModel.insertMany([
      {
        domain: ParamDomain.CHAMPIONSHIP,
        name: 'Campo deportivo Petofi',
        description: 'Zona Barrio Gráfico',
      },
      {
        domain: ParamDomain.CATEGORY,
        name: 'Senior',
        description: 'Campeonato sin límite de edad',
      },
      {
        domain: ParamDomain.COLOR,
        name: 'Negro',
        description: 'Color negro',
      },
      {
        domain: ParamDomain.COLOR,
        name: 'Azul',
        description: 'Color azul',
      },
    ]);

    return `Seed Ejecutado`;
  }
}
