import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { StateColumn } from 'src/common/decorators/state-column.decorator';
import { State } from 'src/common/enums/state.enum';
import { ParamDomain } from '../enums/param-domain.enum';

@Schema({ timestamps: true })
export class Parameter extends Document {
  @Prop({ type: String, enum: ParamDomain, required: true, index: true })
  domain: ParamDomain;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  isActive: boolean;

  @StateColumn()
  aud_state: State;
}
export const ParameterSchema = SchemaFactory.createForClass(Parameter);
ParameterSchema.index({ name: 1, aud_state: 1 });

// Middleware para todas las consultas find, findOne, findOneAndUpdate, etc.
ParameterSchema.pre(/^find/, function (this: mongoose.Query<any, any>, next) {
  this.where({ aud_state: State.ACTIVE });
  next();
});

// Middleware para agregaciones
ParameterSchema.pre('aggregate', function (next) {
  // Agrega un match al inicio del pipeline
  this.pipeline().unshift({ $match: { aud_state: State.ACTIVE } });
  next();
});
