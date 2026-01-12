import { Prop } from '@nestjs/mongoose';
import { State } from '../enums/state.enum';

export const StateColumn = () =>
  Prop({
    type: Number,
    enum: State,
    select: false,
    default: State.ACTIVE,
  });
