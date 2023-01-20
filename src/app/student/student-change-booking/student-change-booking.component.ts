import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { Booking } from 'src/app/shared/booking-selecter/shared/booking.model';
import { BookingService } from 'src/app/shared/booking-selecter/shared/booking.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-student-change-booking',
  templateUrl: './student-change-booking.component.html',
  styleUrls: ['./student-change-booking.component.scss'],
})
export class StudentChangeBookingComponent implements OnInit {
  bookingId: any;
  timeTables: any = [];
  newBooking: Booking = new Booking();
  currentBooking: Booking = new Booking();
  isDateBlock_flg: boolean = false;
  isClicked: boolean = false;
  errors: any[] = [];

  // Date picker params
  selectedDate!: Date;
  minDate = new Date();

  constructor(
    public auth: MyOriginAuthService,
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService //  private dateTimeAdapter: DateTimeAdapter<any>
  ) {
    // Initiate Datepicker
    this.minDate.setDate(this.minDate.getDate() + 1);
    this.minDate.setHours(0, 0, 0, 0);
  }

  ngOnInit() {
    // this.onDateSelect(this.selectedDate);
    this.route.params.subscribe((params) => {
      const bookingId = params['bookingId'];
      this.newBooking._id = bookingId;
      this.getBookingById(bookingId);
    });
  }

  private getBookingById(bookingId: string) {
    this.bookingService.getBookingById(bookingId).subscribe(
      (foundBooking) => {
        this.currentBooking = foundBooking;
      },
      (err) => {}
    );
  }

  onDateSelect(date: Date) {
    const selectedDay = date.getDay();
    let mTimeTables = [];
    let mEndAt = null;
    let mStart = null;

    mEndAt = moment({ hour: 20, minute: 30 }).set({
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate(),
    });
    mStart = moment({ hour: 9, minute: 0 }).set({
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate(),
    });

    while (mStart < mEndAt) {
      mTimeTables.push(moment(mStart));
      mStart.add(30, 'minutes');
    }
    this.timeTables = mTimeTables;
  }

  isValidBooking(start: Date) {
    return true;
  }

  selectDateTime(start: Date) {
    this.isClicked = false;
    this.newBooking.oldStart = this.currentBooking.start;
    this.newBooking.start = start;

    Swal.fire({
      html: `
          <h5>レッスン変更確認</h5>
          ${moment(this.newBooking.oldStart).format('MM月DD日 HH:mm')}〜<br>
          を<br>
          ${moment(this.newBooking.start).format('MM月DD日 HH:mm')}〜
          <br>
          に変更しますか？`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#51cbce',
      cancelButtonColor: '#9A9A9A',
      confirmButtonText: 'はい',
      cancelButtonText: 'いいえ',
      reverseButtons: true,
      allowOutsideClick: false,
    }).then((result) => {
      if (!result.dismiss) {
        this.updateBooking();
      }
    });
  }

  updateBooking() {
    this.isClicked = true;
    this.bookingService.updateBooking(this.newBooking).subscribe(
      (Message) => {
        this.isClicked = false;
        this.showSwalSuccess();
      },
      (errorResponse: HttpErrorResponse) => {
        console.error(errorResponse);
        this.errors = errorResponse.error.errors;
        this.isClicked = false;
      }
    );
  }

  private showSwalSuccess() {
    Swal.fire({
      title: '予約変更しました！',
      icon: 'success',
      customClass: {
        confirmButton: 'btn btn-primary btn-lg',
      },
      buttonsStyling: false,
    }).then(() => {
      this.router.navigate(['/student']);
    });
  }
}
