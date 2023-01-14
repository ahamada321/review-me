// import { Rental } from "src/app/rental/service/rental.model";

export class Booking {
  static readonly DATE_FORMAT = 'Y-MM-DD';
  _id!: string;
  startAt!: string;
  endAt!: string;
  oldStartAt!: string;
  oldEndAt!: string;
  comment!: string;

  days!: number;
  courseTime!: number;
  totalPrice!: number;
  createdAt!: string;
  user!: any;
  paymentToken!: any;
  status!: string;

  rental: any;
}
