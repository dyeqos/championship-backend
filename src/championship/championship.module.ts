import { Module } from '@nestjs/common';
import { ChampionshipService } from './championship.service';
import { ChampionshipController } from './championship.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Championship,
  ChampionshipSchema,
} from './entities/championship.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Championship.name, schema: ChampionshipSchema },
    ]),
  ],
  controllers: [ChampionshipController],
  providers: [ChampionshipService],
})
export class ChampionshipModule {}
