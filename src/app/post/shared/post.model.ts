import { NgbTimeStruct } from "@ng-bootstrap/ng-bootstrap";

export class Post {
  _id!: string;
  createdAt!: string;
  lastLogin!: string;

  static readonly CATEGORIES = ["カテゴリ1", "カテゴリ2"];
  isShared!: boolean;
  isApproved!: boolean;
  isBanned!: boolean;
  reasonOfBanned!: string;

  lineURL!: string;
  homepage!: string;
  facebook!: string;
  twitter!: string;
  instagram!: string;
  youtube!: string;
  selectedCategory!: string;

  rentalname!: string;
  email!: string;
  birthday!: Date;

  province!: any[];
  address1!: string;
  address2!: string;
  // hourlyPrice: number;
  // cardDescription;
  description!: string;

  course1Img!: string;
  course1Title!: string;
  course1Description!: string;
  course2Title!: string;
  course2Img!: string;
  course2Description!: string;
  memo!: string;

  image!: string;
  gallery1!: string;
  gallery2!: string;
  gallery3!: string;
  gallery4!: string;
  gallery5!: string;
  gallery6!: string;
  gallery7!: string;
  gallery8!: string;
  videoLink!: string;

  rating!: number;
  user!: any;
  brand!: any;
  favouritesFrom!: any[];
  // bookings!: Booking[];
  // businesshour_enabled_sun: boolean;
  // businesshour_startTime_sun: NgbTimeStruct;
  // businesshour_endTime_sun: NgbTimeStruct;
  // businesshour_enabled_mon: boolean;
  // businesshour_startTime_mon: NgbTimeStruct;
  // businesshour_endTime_mon: NgbTimeStruct;
  // businesshour_enabled_tue: boolean;
  // businesshour_startTime_tue: NgbTimeStruct;
  // businesshour_endTime_tue: NgbTimeStruct;
  // businesshour_enabled_wed: boolean;
  // businesshour_startTime_wed: NgbTimeStruct;
  // businesshour_endTime_wed: NgbTimeStruct;
  // businesshour_enabled_thu: boolean;
  // businesshour_startTime_thu: NgbTimeStruct;
  // businesshour_endTime_thu: NgbTimeStruct;
  // businesshour_enabled_fri: boolean;
  // businesshour_startTime_fri: NgbTimeStruct;
  // businesshour_endTime_fri: NgbTimeStruct;
  // businesshour_enabled_sat: boolean;
  // businesshour_startTime_sat: NgbTimeStruct;
  // businesshour_endTime_sat: NgbTimeStruct;
}
