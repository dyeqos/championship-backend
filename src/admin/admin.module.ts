import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { Person, PersonSchema } from 'src/persons/entities/person.entity';
import {
  Parameter,
  ParameterSchema,
} from 'src/parameters/entities/parameter.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Person.name, schema: PersonSchema },
      { name: Parameter.name, schema: ParameterSchema },
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
