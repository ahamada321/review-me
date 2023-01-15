import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Booking } from 'src/app/shared/booking-selecter/shared/booking.model';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-student-booking',
  templateUrl: './student-booking.component.html',
  styleUrls: ['./student-booking.component.scss'],
})
export class StudentBookingComponent implements OnInit {
  isSelectedDateTime: boolean = false;

  selectedDate!: Date;
  minDate = new Date();
  timeTables: any = [];
  isDateBlock_flg: boolean = false;
  isClicked: boolean = false;
  newBooking: any = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {}

  onDateSelect(date: Date) {
    const selectedDay = date.getDay();
    let mTimeTables = [];
    let mEndAt = null;
    let mStartAt = null;

    mEndAt = moment({ hour: 20, minute: 30 }).set({
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate(),
    });
    mStartAt = moment({ hour: 9, minute: 0 }).set({
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate(),
    });

    while (mStartAt < mEndAt) {
      mTimeTables.push(moment(mStartAt));
      mStartAt.add(30, 'minutes');
    }
    this.timeTables = mTimeTables;
  }

  isValidBooking(startAt: any) {
    return true;
  }

  selectDateTime(startAt: any) {
    this.isSelectedDateTime = true;
    this.isClicked = false;
    this.newBooking.startAt = startAt;

    Swal.fire({
      html: `
          <h5>予約日時</h5>
          ${moment(startAt).format('MM月 DD日 HH:mm')} 〜
          <br><br>
          で予約しますか？`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#51cbce',
      cancelButtonColor: '#9A9A9A',
      confirmButtonText: 'はい',
      cancelButtonText: 'いいえ',
      allowOutsideClick: false,
    }).then((result) => {
      if (!result.dismiss) {
        this.createBooking();
      }
    });
  }

  createBooking() {
    this.isClicked = true;
    this.newBooking.courseTime = 30;
    // this.newBooking.clinic = this.clinic;
    // this.bookingService.createBooking(this.newBooking).subscribe(
    //   (newBooking) => {
    //     this.newBooking = new Booking();
    //     this.isClicked = false;
    //     this.showSwalSuccess();
    //   },
    //   (errorResponse: HttpErrorResponse) => {
    //     console.error(errorResponse);
    //     this.errors = errorResponse.error.errors;
    //     this.isClicked = false;
    //   }
    // );
  }
}
