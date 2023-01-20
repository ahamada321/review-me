// import { Rental } from "src/app/rental/service/rental.model";

import { User } from '../../services/user.model';

export class Booking {
  static readonly DATE_FORMAT = 'Y-MM-DD';
  _id?: string;
  createdAt?: Date;
  startAt!: any;
  oldStartAt?: any;
  perMonth?: number;
  courseTime?: number;
  memo?: string;

  teacher!: User;
  student!: User;
  status: string = 'Pending';
}
