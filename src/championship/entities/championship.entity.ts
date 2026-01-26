import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { StateColumn } from '../../common/decorators/state-column.decorator';
import { Parameter } from 'src/parameters/entities/parameter.entity';
import { State } from 'src/common/enums/state.enum';
import { Gender } from 'src/common/enums/gender.enum';
import { ChampionshipState } from '../enums/championshipState.enum';

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
    type: Date,
  })
  dateInit?: Date;

  @Prop({
    type: Date,
  })
  dateEnd?: Date;

  @Prop({
    type: Number,
    enum: ChampionshipState,
    default: ChampionshipState.DRAFT,
  })
  state: ChampionshipState;

  @Prop({ type: Number, default: 0 })
  totalTeams: number;

  @StateColumn()
  audState: State;
}

export const ChampionshipSchema = SchemaFactory.createForClass(Championship);

// Middleware para todas las consultas find, findOne, findOneAndUpdate, etc.
ChampionshipSchema.pre(
  /^find/,
  function (this: mongoose.Query<any, any>, next) {
    this.where({ audState: State.ACTIVE });
    this.populate('name').populate('category');
    next();
  },
);

// Middleware para agregaciones
ChampionshipSchema.pre('aggregate', function (next) {
  // Agrega un match al inicio del pipeline
  this.pipeline().unshift(
    { $match: { audState: State.ACTIVE } },

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
