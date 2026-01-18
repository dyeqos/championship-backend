import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { Team, TeamSchema } from './entities/team.entity';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { Person, PersonSchema } from 'src/persons/entities/person.entity';
import {
  Championship,
  ChampionshipSchema,
} from 'src/championship/entities/championship.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Team.name, schema: TeamSchema },
      { name: User.name, schema: UserSchema },
      { name: Person.name, schema: PersonSchema },
      { name: Championship.name, schema: ChampionshipSchema },
    ]),
  ],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}
