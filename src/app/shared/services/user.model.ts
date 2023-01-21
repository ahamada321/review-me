import { Schema } from 'mongoose';
import { Booking } from '../booking-selecter/shared/booking.model';

export class User {
  _id?: Schema.Types.ObjectId;
  isVerified?: boolean;
  userRole: string = 'Student';

  username?: string;
  email?: string;
  password?: string;
  passwordConfirmation?: string; // Frontend only!

  pendingTeachers!: User[];
  pendingStudents!: User[];
  teachers!: User[];
  students!: User[];

  perMonth?: number;
  courseTime?: number;
  bookings!: Booking[];

  affiliateCode?: string;
  stripe?: string;
}
