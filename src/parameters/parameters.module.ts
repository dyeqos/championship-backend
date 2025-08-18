import { Module } from '@nestjs/common';
import { ParametersService } from './parameters.service';
import { ParametersController } from './parameters.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Parameter, ParameterSchema } from './entities/parameter.entity';

@Module({
  controllers: [ParametersController],
  providers: [ParametersService],
  imports: [
    MongooseModule.forFeature([
      { name: Parameter.name, schema: ParameterSchema },
    ]),
  ],
})
export class ParametersModule {}
