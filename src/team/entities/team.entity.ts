import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { User } from '../../users/entities/user.entity';
import { Championship } from '../../championship/entities/championship.entity';
import { TeamState } from '../enums/team-state.enum';
import { Parameter } from '../../parameters/entities/parameter.entity';
import { State } from '../../common/enums/state.enum';
import { StateColumn } from '../../common/decorators/state-column.decorator';

@Schema({ timestamps: true })
export class Team extends Document {
  @Prop({ required: true })
  name!: string;
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  teamUser!: User;
  @Prop({
    type: Types.ObjectId,
    ref: Championship.name,
    required: true,
    index: true,
  })
  championship!: Championship;
  @Prop({ type: Number, enum: TeamState, default: TeamState.PENDING })
  state!: TeamState;
  @Prop({ type: Types.ObjectId, ref: Parameter.name })
  color?: Parameter;

  //datos juego
  @Prop({ default: 0 })
  pl!: number; //partidos jugados
  @Prop({ default: 0 })
  w!: number; //partidos ganados
  @Prop({ default: 0 })
  d!: number; //partidos empatados
  @Prop({ default: 0 })
  l!: number; //partidos perdidos
  @Prop({ default: 0 })
  gf!: number; //gol a favor
  @Prop({ default: 0 })
  ga!: number; //gol en contra
  @Prop({ default: 0 })
  gd!: number; //gol en diferencia
  @Prop({ default: 0 })
  pts!: number; //puntos
  @StateColumn()
  audState!: State;
}
export const TeamSchema = SchemaFactory.createForClass(Team);
TeamSchema.index({ championship: 1, audState: 1 });

TeamSchema.pre(/^find/, function (this: mongoose.Query<any, any>, next) {
  this.where({ audState: State.ACTIVE });
  this.populate('color');
  this.populate('teamUser');
  this.populate('championship');
  next();
});
TeamSchema.pre('aggregate', function (next) {
  // Agrega un match al inicio del pipeline
  this.pipeline().unshift(
    { $match: { audState: State.ACTIVE } },

    // Join con parameters para "name"
    {
      $lookup: {
        from: 'parameters', // colección real
        localField: 'color',
        foreignField: '_id',
        as: 'color',
      },
    },
    {
      $unwind: {
        path: '$color',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: 'users', // colección real
        localField: 'teamUser',
        foreignField: '_id',
        as: 'teamUser',
      },
    },
    {
      $unwind: {
        path: '$teamUser',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: 'championships', // colección real
        localField: 'championship',
        foreignField: '_id',
        as: 'championship',
      },
    },
    {
      $unwind: {
        path: '$championship',
        preserveNullAndEmptyArrays: true,
      },
    },
  );
  next();
});
