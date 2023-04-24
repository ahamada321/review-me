import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { BookingService } from "./shared/booking.service";

// import { Post } from 'src/app/post/service/post.model';
import { Booking } from "./shared/booking.model";

import * as moment from "moment-timezone";

@Component({
  selector: "app-booking-selecter",
  templateUrl: "./booking-selecter.component.html",
  styleUrls: ["./booking-selecter.component.scss"],
})
export class BookingSelecterComponent implements OnInit {
  focus!: boolean;
  timeTables: any = [];
  newBooking!: Booking;
  isDateBlock_flg: boolean = false;

  // Date picker params
  selectedDate: Date;
  minDate = new Date();
  maxDate = new Date();

  // @Input() post: Post;
  @Input() post: any; //tmp
  @Input() selectedCourseTime: number = 60;
  @Output() newBookingInfo = new EventEmitter();

  constructor(private bookingService: BookingService) {
    // Initiate Datepicker
    this.selectedDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate() + 8); // Enables to post before 6 days.
    this.maxDate = new Date(
      this.maxDate.getFullYear(),
      this.maxDate.getMonth(),
      this.maxDate.getDate()
    ); // Convert to date format
  }

  ngOnInit() {
    this.onDateSelect(this.selectedDate);
    this.newBooking = new Booking();
  }

  onDateSelect(date: Date) {
    // this.isDateBlock_flg = false
    // this.isDateBlock(date)
    // const selectedDay = date.getDay()
    // let mTimeTables = []
    // let mEnd = null
    // let mStart = null
    // if(selectedDay==0 && this.post.businesshour_enabled_sun) { // Sunday
    //   mEnd = moment(this.post.businesshour_endTime_sun).set({'year': date.getFullYear(), 'month': date.getMonth(), 'date': date.getDate()})
    //   mStart = moment(this.post.businesshour_startTime_sun).set({'year': date.getFullYear(), 'month': date.getMonth(), 'date': date.getDate()})
    // }
    // if(selectedDay==1 && this.post.businesshour_enabled_mon) { // Monday
    //   mEnd = moment(this.post.businesshour_endTime_mon).set({'year': date.getFullYear(), 'month': date.getMonth(), 'date': date.getDate()})
    //   mStart = moment(this.post.businesshour_startTime_mon).set({'year': date.getFullYear(), 'month': date.getMonth(), 'date': date.getDate()})
    // }
    // if(selectedDay==2 && this.post.businesshour_enabled_tue) {
    //   mEnd = moment(this.post.businesshour_endTime_tue).set({'year': date.getFullYear(), 'month': date.getMonth(), 'date': date.getDate()})
    //   mStart = moment(this.post.businesshour_startTime_tue).set({'year': date.getFullYear(), 'month': date.getMonth(), 'date': date.getDate()})
    // }
    // if(selectedDay==3 && this.post.businesshour_enabled_wed) {
    //   mEnd = moment(this.post.businesshour_endTime_wed).set({'year': date.getFullYear(), 'month': date.getMonth(), 'date': date.getDate()})
    //   mStart = moment(this.post.businesshour_startTime_wed).set({'year': date.getFullYear(), 'month': date.getMonth(), 'date': date.getDate()})
    // }
    // if(selectedDay==4 && this.post.businesshour_enabled_thu) {
    //   mEnd = moment(this.post.businesshour_endTime_thu).set({'year': date.getFullYear(), 'month': date.getMonth(), 'date': date.getDate()})
    //   mStart = moment(this.post.businesshour_startTime_thu).set({'year': date.getFullYear(), 'month': date.getMonth(), 'date': date.getDate()})
    // }
    // if(selectedDay==5 && this.post.businesshour_enabled_fri) {
    //   mEnd = moment(this.post.businesshour_endTime_fri).set({'year': date.getFullYear(), 'month': date.getMonth(), 'date': date.getDate()})
    //   mStart = moment(this.post.businesshour_startTime_fri).set({'year': date.getFullYear(), 'month': date.getMonth(), 'date': date.getDate()})
    // }
    // if(selectedDay==6 && this.post.businesshour_enabled_sat) {
    //   mEnd = moment(this.post.businesshour_endTime_sat).set({'year': date.getFullYear(), 'month': date.getMonth(), 'date': date.getDate()})
    //   mStart = moment(this.post.businesshour_startTime_sat).set({'year': date.getFullYear(), 'month': date.getMonth(), 'date': date.getDate()})
    // }
    // while(mStart < mEnd) {
    //     if(!this.isPastDateTime(mStart)){
    //         mTimeTables.push(moment(mStart))
    //     }
    //     mStart.add(30, 'minutes')
    // }
    // this.timeTables = mTimeTables
    // this.newBookingInfo.emit(null)
  }

  private isPastDateTime(start: Date) {
    return moment(start).diff(moment()) < 0; // Attention: just "moment()" is already applied timezone!
  }

  isDateBlock(selectedDate: Date) {
    const selected_date = moment(selectedDate)
      .subtract(1, "month")
      .format("YYYY-MM-DD"); // Subtract 1 month to adapt NgbDateStruct to moment()

    for (let booking of this.post.bookings) {
      if (booking.status === "block") {
        if (selected_date === moment(booking.start).format("YYYY-MM-DD")) {
          this.isDateBlock_flg = true;
        }
      }
    }
  }

  isValidBooking(start: Date) {
    let isValid = false;
    const postBookings = this.post.bookings;

    const reqStart = moment(start);
    const reqEnd = moment(start)
      .add(this.selectedCourseTime, "minute")
      .subtract(1, "minute");
    if (postBookings && postBookings.length === 0) {
      return true;
    } else {
      isValid = postBookings.every((booking: any) => {
        const existingStart = moment(booking.start);
        const existingEnd = moment(booking.end);
        // return ((existingStart<reqStart && existingEnd<reqStart) || (reqEnd<existingStart && reqEnd<existingEnd))
        return existingEnd < reqStart || reqEnd < existingStart;
      });
      return isValid;
    }
  }

  selectDateTime(start: Date) {
    // this.newBooking.start = moment(start).format();
    // this.newBooking.end = moment(start)
    //   .add(this.selectedCourseTime - 1, "minute")
    //   .format();
    // this.newBooking.courseTime = this.selectedCourseTime;
    // this.newBooking.totalPrice =
    //   this.post.hourlyPrice * (this.selectedCourseTime / 60);
    // this.newBookingInfo.emit(this.newBooking);
  }
}
