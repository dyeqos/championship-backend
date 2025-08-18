import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChampionshipModule } from './championship/championship.module';
import { CommonModule } from './common/common.module';
import { ParametersModule } from './parameters/parameters.module';

@Module({
  imports: [
    ChampionshipModule,
    MongooseModule.forRoot(
      'mongodb://champ_user:champ_pass123@localhost:27017/championship-db',
    ),
    CommonModule,
    ParametersModule,
  ],
})
export class AppModule {}
