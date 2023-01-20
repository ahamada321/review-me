import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Booking } from 'src/app/shared/booking-selecter/shared/booking.model';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { BookingService } from 'src/app/shared/booking-selecter/shared/booking.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { HttpErrorResponse } from '@angular/common/http';

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
  newBooking: Booking = new Booking();
  errors: any;
  userData: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public auth: MyOriginAuthService,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    const studentId = this.auth.getUserId();
    this.auth.getUserById(studentId).subscribe(
      (foundStudent) => {
        this.newBooking.teacher = foundStudent.teachers[0]; //tmp
        // this.newBooking.student = foundStudent;
      },
      (err) => {}
    );
  }

  onDateSelect(date: Date) {
    const selectedDay = date.getDay();
    let mTimeTables = [];
    let mEnd = null;
    let mStart = null;

    mEnd = moment({ hour: 20, minute: 30 }).set({
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate(),
    });
    mStart = moment({ hour: 9, minute: 0 }).set({
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate(),
    });

    while (mStart < mEnd) {
      mTimeTables.push(moment(mStart));
      mStart.add(30, 'minutes');
    }
    this.timeTables = mTimeTables;
  }

  isValidBooking(start: any) {
    return true;
  }

  selectDateTime(start: any) {
    this.isSelectedDateTime = true;
    this.isClicked = false;
    this.newBooking.start = start;

    Swal.fire({
      html: `
          <h5>予約日時</h5>
          ${moment(start).format('MM月 DD日 HH:mm')} 〜
          <br><br>
          で予約しますか？`,
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
        this.createBooking();
      }
    });
  }

  createBooking() {
    this.isClicked = true;
    this.newBooking.title = this.auth.getUsername();
    this.newBooking.courseTime = 30;
    this.bookingService.createBooking(this.newBooking).subscribe(
      (newBooking) => {
        this.newBooking = new Booking();
        this.isClicked = false;
        this.showSwalSuccess();
      },
      (errorResponse: HttpErrorResponse) => {
        console.error(errorResponse);
        if (errorResponse.error && errorResponse.error.errors) {
          this.errors = errorResponse.error.errors;
        } else {
          this.errors = ['Unexpected error occured'];
        }

        this.isClicked = false;
      }
    );
  }

  private showSwalSuccess() {
    Swal.fire({
      title: '予約完了しました！',
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
