import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Gender } from '../enums/gender.enum';
import { State } from 'src/common/enums/state.enum';
import { StateColumn } from '../../common/decorators/stateColumn.decorator';
import { Parameter } from 'src/parameters/entities/parameter.entity';

@Schema({ timestamps: true })
export class Championship extends Document {
  @Prop({ type: Types.ObjectId, ref: Parameter.name, required: true })
  name: Parameter;

  @Prop({ required: true })
  gestion: number;

  @Prop({ required: true })
  version: number;

  @Prop({ type: Types.ObjectId, ref: Parameter.name, required: true })
  category: Parameter;

  @Prop({
    type: Number,
    enum: Gender,
    required: true,
  })
  gender: Gender;

  @StateColumn()
  state: State;
}

export const ChampionshipSchema = SchemaFactory.createForClass(Championship);
