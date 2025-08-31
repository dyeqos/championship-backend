import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ChampionshipService } from './championship.service';
import { ChampionshipController } from './championship.controller';
import {
  Championship,
  ChampionshipSchema,
} from './entities/championship.entity';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: Championship.name, schema: ChampionshipSchema },
    ]),
  ],
  controllers: [ChampionshipController],
  providers: [ChampionshipService],
})
export class ChampionshipModule {}
