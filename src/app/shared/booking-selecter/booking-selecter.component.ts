import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BookingService } from './shared/booking.service';

// import { Rental } from 'src/app/rental/service/rental.model';
import { Booking } from './shared/booking.model';

import * as moment from 'moment-timezone';

@Component({
  selector: 'app-booking-selecter',
  templateUrl: './booking-selecter.component.html',
  styleUrls: ['./booking-selecter.component.scss'],
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

  // @Input() rental: Rental;
  @Input() rental: any; //tmp
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
    // this.iskDateBlock(date)
    // const selectedDay = date.getDay()
    // let mTimeTables = []
    // let mEndAt = null
    // let mStartAt = null
    // if(selectedDay==0 && this.rental.businesshour_enabled_sun) { // Sunday
    //   mEndAt = moment(this.rental.businesshour_endTime_sun).set({'year': date.getFullYear(), 'month': date.getMonth(), 'date': date.getDate()})
    //   mStartAt = moment(this.rental.businesshour_startTime_sun).set({'year': date.getFullYear(), 'month': date.getMonth(), 'date': date.getDate()})
    // }
    // if(selectedDay==1 && this.rental.businesshour_enabled_mon) { // Monday
    //   mEndAt = moment(this.rental.businesshour_endTime_mon).set({'year': date.getFullYear(), 'month': date.getMonth(), 'date': date.getDate()})
    //   mStartAt = moment(this.rental.businesshour_startTime_mon).set({'year': date.getFullYear(), 'month': date.getMonth(), 'date': date.getDate()})
    // }
    // if(selectedDay==2 && this.rental.businesshour_enabled_tue) {
    //   mEndAt = moment(this.rental.businesshour_endTime_tue).set({'year': date.getFullYear(), 'month': date.getMonth(), 'date': date.getDate()})
    //   mStartAt = moment(this.rental.businesshour_startTime_tue).set({'year': date.getFullYear(), 'month': date.getMonth(), 'date': date.getDate()})
    // }
    // if(selectedDay==3 && this.rental.businesshour_enabled_wed) {
    //   mEndAt = moment(this.rental.businesshour_endTime_wed).set({'year': date.getFullYear(), 'month': date.getMonth(), 'date': date.getDate()})
    //   mStartAt = moment(this.rental.businesshour_startTime_wed).set({'year': date.getFullYear(), 'month': date.getMonth(), 'date': date.getDate()})
    // }
    // if(selectedDay==4 && this.rental.businesshour_enabled_thu) {
    //   mEndAt = moment(this.rental.businesshour_endTime_thu).set({'year': date.getFullYear(), 'month': date.getMonth(), 'date': date.getDate()})
    //   mStartAt = moment(this.rental.businesshour_startTime_thu).set({'year': date.getFullYear(), 'month': date.getMonth(), 'date': date.getDate()})
    // }
    // if(selectedDay==5 && this.rental.businesshour_enabled_fri) {
    //   mEndAt = moment(this.rental.businesshour_endTime_fri).set({'year': date.getFullYear(), 'month': date.getMonth(), 'date': date.getDate()})
    //   mStartAt = moment(this.rental.businesshour_startTime_fri).set({'year': date.getFullYear(), 'month': date.getMonth(), 'date': date.getDate()})
    // }
    // if(selectedDay==6 && this.rental.businesshour_enabled_sat) {
    //   mEndAt = moment(this.rental.businesshour_endTime_sat).set({'year': date.getFullYear(), 'month': date.getMonth(), 'date': date.getDate()})
    //   mStartAt = moment(this.rental.businesshour_startTime_sat).set({'year': date.getFullYear(), 'month': date.getMonth(), 'date': date.getDate()})
    // }
    // while(mStartAt < mEndAt) {
    //     if(!this.isPastDateTime(mStartAt)){
    //         mTimeTables.push(moment(mStartAt))
    //     }
    //     mStartAt.add(30, 'minutes')
    // }
    // this.timeTables = mTimeTables
    // this.newBookingInfo.emit(null)
  }

  private isPastDateTime(startAt: Date) {
    return moment(startAt).diff(moment()) < 0; // Attention: just "moment()" is already applied timezone!
  }

  iskDateBlock(selectedDate: Date) {
    const selected_date = moment(selectedDate)
      .subtract(1, 'month')
      .format('YYYY-MM-DD'); // Subtract 1 month to adapt NgbDateStruct to moment()

    for (let booking of this.rental.bookings) {
      if (booking.status === 'block') {
        if (selected_date === moment(booking.startAt).format('YYYY-MM-DD')) {
          this.isDateBlock_flg = true;
        }
      }
    }
  }

  isValidBooking(startAt: Date) {
    let isValid = false;
    const rentalBookings = this.rental.bookings;

    const reqStart = moment(startAt);
    const reqEnd = moment(startAt)
      .add(this.selectedCourseTime, 'minute')
      .subtract(1, 'minute');
    if (rentalBookings && rentalBookings.length === 0) {
      return true;
    } else {
      isValid = rentalBookings.every((booking: any) => {
        const existingStart = moment(booking.startAt);
        const existingEnd = moment(booking.endAt);
        // return ((existingStart<reqStart && existingEnd<reqStart) || (reqEnd<existingStart && reqEnd<existingEnd))
        return existingEnd < reqStart || reqEnd < existingStart;
      });
      return isValid;
    }
  }

  selectDateTime(startAt: Date) {
    // this.newBooking.startAt = moment(startAt).format();
    // this.newBooking.endAt = moment(startAt)
    //   .add(this.selectedCourseTime - 1, "minute")
    //   .format();
    // this.newBooking.courseTime = this.selectedCourseTime;
    // this.newBooking.totalPrice =
    //   this.rental.hourlyPrice * (this.selectedCourseTime / 60);
    // this.newBookingInfo.emit(this.newBooking);
  }
}
