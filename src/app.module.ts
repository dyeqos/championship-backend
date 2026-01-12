import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ChampionshipModule } from './championship/championship.module';
import { CommonModule } from './common/common.module';
import { ParametersModule } from './parameters/parameters.module';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './tools/validations/joi.validation';
import { PlayersModule } from './players/players.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),
    MongooseModule.forRoot(process.env.MONGO_DB!, {
      dbName: process.env.NAME_DB!,
      authSource: process.env.SOURCE_DB!,
    }),
    ChampionshipModule,
    CommonModule,
    ParametersModule,
    PlayersModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
