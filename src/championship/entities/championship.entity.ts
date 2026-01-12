import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { State } from 'src/common/enums/state.enum';
import { StateColumn } from '../../common/decorators/state-column.decorator';
import { Parameter } from 'src/parameters/entities/parameter.entity';
import { ChampionshipState } from '../enums/championshipState.enum';
import { STRING_DATE_REGEX } from 'src/constants/regex.constant';
import { Gender } from 'src/common/enums/gender.enum';

@Schema({ timestamps: true })
export class Championship extends Document {
  @Prop({ type: Types.ObjectId, ref: Parameter.name, required: true })
  name: Parameter;

  @Prop({ required: true })
  management: number;

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

  @Prop({
    type: String,
    match: STRING_DATE_REGEX,
  })
  dateInit: string;

  @Prop({
    type: String,
    match: STRING_DATE_REGEX,
  })
  dateFinish: string;

  @Prop({
    type: Number,
    enum: ChampionshipState,
    default: ChampionshipState.DRAFT,
  })
  state: ChampionshipState;

  @StateColumn()
  aud_state: State;
}

export const ChampionshipSchema = SchemaFactory.createForClass(Championship);

// Middleware para todas las consultas find, findOne, findOneAndUpdate, etc.
ChampionshipSchema.pre(
  /^find/,
  function (this: mongoose.Query<any, any>, next) {
    this.where({ aud_state: State.ACTIVE });
    this.populate('name').populate('category');
    next();
  },
);

// Middleware para agregaciones
ChampionshipSchema.pre('aggregate', function (next) {
  // Agrega un match al inicio del pipeline
  this.pipeline().unshift(
    { $match: { aud_state: State.ACTIVE } },

    // Join con parameters para "name"
    {
      $lookup: {
        from: 'parameters', // colección real
        localField: 'name',
        foreignField: '_id',
        as: 'name',
      },
    },
    {
      $unwind: {
        path: '$name',
        preserveNullAndEmptyArrays: true,
      },
    },

    // Join con parameters para "category"
    {
      $lookup: {
        from: 'parameters',
        localField: 'category',
        foreignField: '_id',
        as: 'category',
      },
    },
    {
      $unwind: {
        path: '$category',
        preserveNullAndEmptyArrays: true,
      },
    },
  );
  next();
});
