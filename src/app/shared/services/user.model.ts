import { Schema } from "mongoose";
import { NgbTimeStruct } from "@ng-bootstrap/ng-bootstrap";
import { Booking } from "../booking-selecter/shared/booking.model";
import { Notification } from "./notification.model";

export class User {
  _id?: Schema.Types.ObjectId;
  isVerified?: boolean;
  userRole: string = "User";

  username?: string;
  email?: string;
  oldEmail?: string;
  password?: string;
  passwordConfirmation?: string; // Frontend only!

  pendingWorkers!: User[];
  pendingUsers!: User[];
  notifications!: Notification[];
  teachers!: User[];
  students!: User[];

  perMonth?: number;
  courseTime?: number;
  bookings!: Booking[];

  affiliateCode?: string;
  stripe?: string;

  // bookingNotificationFromUser?: boolean;
  changeBookingNotificationFromUser?: boolean;
  newsLetterFromLessonCalendar?: boolean;

  mon_enabled?: boolean;
  mon_start?: NgbTimeStruct;
  mon_end?: NgbTimeStruct;
  tue_enabled?: boolean;
  tue_start?: NgbTimeStruct;
  tue_end?: NgbTimeStruct;
  wed_enabled?: boolean;
  wed_start?: NgbTimeStruct;
  wed_end?: NgbTimeStruct;
  thu_enabled?: boolean;
  thu_start?: NgbTimeStruct;
  thu_end?: NgbTimeStruct;
  fri_enabled?: boolean;
  fri_start?: NgbTimeStruct;
  fri_end?: NgbTimeStruct;
  sat_enabled?: boolean;
  sat_start?: NgbTimeStruct;
  sat_end?: NgbTimeStruct;
  sun_enabled?: boolean;
  sun_start?: NgbTimeStruct;
  sun_end?: NgbTimeStruct;
}
