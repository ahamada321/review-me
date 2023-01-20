// import { Rental } from "src/app/rental/service/rental.model";

import { User } from '../../services/user.model';

export class Booking {
  static readonly DATE_FORMAT = 'Y-MM-DD';
  _id?: string;
  createdAt?: Date;

  title!: string;
  start!: any;
  oldStart?: any;
  courseTime?: number;
  end!: any;

  perMonth?: number;
  memo?: string;

  teacher!: User;
  student!: User;
  status: string = 'Pending';
}
