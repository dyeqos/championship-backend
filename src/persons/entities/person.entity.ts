import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { StateColumn } from 'src/common/decorators/state-column.decorator';
import { Gender } from 'src/common/enums/gender.enum';
import { State } from 'src/common/enums/state.enum';

@Schema({ timestamps: true })
export class Person extends Document {
  @Prop({ required: true })
  firstName!: string;
  @Prop()
  lastName?: string;
  @Prop()
  secondLastName?: string;
  @Prop({ required: true, type: Date })
  birthdate!: Date;
  @Prop({ required: true, enum: Gender })
  gender!: Gender;
  @Prop({ required: true, unique: true, index: true })
  numberIdentifier!: number;
  @StateColumn()
  audState!: State;
}

export const PersonSchema = SchemaFactory.createForClass(Person);

PersonSchema.pre(/^find/, function (this: mongoose.Query<any, any>, next) {
  this.where({ audState: State.ACTIVE });
  next();
});

PersonSchema.pre('aggregate', function (next) {
  // Agregar un match al inicio del pipeline
  this.pipeline().unshift({ $match: { audState: State.ACTIVE } });
  next();
});
