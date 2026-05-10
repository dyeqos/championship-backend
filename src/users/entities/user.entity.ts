import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { ValidRoles } from 'src/auth/enum/valid-roles.enum';
import { StateColumn } from 'src/common/decorators/state-column.decorator';
import { State } from 'src/common/enums/state.enum';
import { Person } from 'src/persons/entities/person.entity';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, index: true, unique: true })
  email!: string;
  @Prop({ required: true, select: false })
  password!: string;
  @Prop({ type: Types.ObjectId, ref: Person.name, required: false })
  person?: Person;
  @Prop({
    default: [ValidRoles.GUEST],
  })
  roles!: string[];
  @StateColumn()
  audState!: State;
}
export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ email: 1, audState: 1 });

UserSchema.pre(/^find/, function (this: mongoose.Query<any, any>, next) {
  this.where({ audState: State.ACTIVE });
  this.populate('person');
  next();
});

UserSchema.pre('aggregate', function (next) {
  this.pipeline().unshift(
    { $match: { audState: State.ACTIVE } },

    {
      $lookup: {
        from: 'persons', // colección real
        localField: 'person',
        foreignField: '_id',
        as: 'person',
      },
    },
    {
      $unwind: {
        path: '$person',
        preserveNullAndEmptyArrays: true,
      },
    },
  );
  next();
});
