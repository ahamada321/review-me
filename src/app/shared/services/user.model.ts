import { Booking } from '../booking-selecter/shared/booking.model';

export class User {
  _id?: string;
  isVerified?: boolean;
  userRole: string = 'Student';
  perMonth?: number;
  courseTime?: number;

  username?: string;
  email?: string;
  password?: string;
  passwordConfirmation?: string; // Frontend only!

  pendingTeachers!: User[];
  pendingStudents!: User[];
  teachers!: User[];
  students!: User[];

  bookings!: Booking[];

  affiliateCode?: string;
  stripe?: string;
}
