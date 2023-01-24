import { Schema } from 'mongoose';
import { User } from './user.model';

export class Notification {
  _id?: Schema.Types.ObjectId;

  createdAt!: string;
  title!: string;
  description!: string;
  user!: User[];
}
