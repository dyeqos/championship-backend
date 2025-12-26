import { Types } from 'mongoose';

export interface MongoBase {
  _id?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}
