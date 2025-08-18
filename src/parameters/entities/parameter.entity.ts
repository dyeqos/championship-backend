import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { StateColumn } from 'src/common/decorators/stateColumn.decorator';
import { State } from 'src/common/enums/state.enum';

@Schema({ timestamps: true })
export class Parameter extends Document {
  @Prop({ required: true, index: true })
  name: string;

  @Prop({ required: true })
  value: number;

  @Prop({ required: true })
  description: string;

  @StateColumn()
  state: State;
}

export const ParameterSchema = SchemaFactory.createForClass(Parameter);
