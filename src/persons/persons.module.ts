import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Person, PersonSchema } from 'src/persons/entities/person.entity';

import { AuthModule } from 'src/auth/auth.module';
import { PersonsController } from './persons.controller';
import { PersonsService } from './persons.service';

@Module({
  controllers: [PersonsController],
  providers: [PersonsService],
  imports: [
    MongooseModule.forFeature([{ name: Person.name, schema: PersonSchema }]),
    AuthModule,
  ],
})
export class PersonsModule {}
