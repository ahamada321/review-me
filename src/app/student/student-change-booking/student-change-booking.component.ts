import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { Booking } from 'src/app/shared/booking-selecter/shared/booking.model';
import { BookingService } from 'src/app/shared/booking-selecter/shared/booking.service';
import Swal from 'sweetalert2';
import * as moment from 'moment-timezone';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/services/user.model';

@Component({
  selector: 'app-student-change-booking',
  templateUrl: './student-change-booking.component.html',
  styleUrls: ['./student-change-booking.component.scss'],
})
export class StudentChangeBookingComponent implements OnInit {
  timeTables: any = [];
  studentData!: User;
  teacherData!: User;
  newBooking!: Booking;
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
    private userService: UserService,
    private bookingService: BookingService //  private dateTimeAdapter: DateTimeAdapter<any>
  ) {
    // Initiate Datepicker
    this.minDate.setDate(this.minDate.getDate() + 1);
    this.minDate.setHours(0, 0, 0, 0);
  }

  ngOnInit() {
    this.getMe();
    // this.onDateSelect(this.selectedDate);
    this.route.params.subscribe((params) => {
      const bookingId = params['bookingId'];
      this.getBookingById(bookingId);
    });
  }

  private getBookingById(bookingId: string) {
    this.bookingService.getBookingById(bookingId).subscribe(
      (foundBooking) => {
        this.newBooking = foundBooking;
        this.newBooking.oldStart = foundBooking.start;
        this.newBooking.oldEnd = foundBooking.end;
      },
      (err) => {}
    );
  }

  getMe() {
    const studentId = this.auth.getUserId();
    this.userService.getUserById(studentId).subscribe(
      (foundUser) => {
        this.studentData = foundUser;
        this.getMyTeacher(foundUser.teachers[0]._id);
      },
      (errorResponse: HttpErrorResponse) => {
        this.errors = errorResponse.error.errors;
      }
    );
  }

  getMyTeacher(teacherId: any) {
    this.userService.getUserById(teacherId).subscribe(
      (foundUser) => {
        this.teacherData = foundUser;
      },
      (errorResponse: HttpErrorResponse) => {
        this.errors = errorResponse.error.errors;
      }
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

  isValidBooking(start: any) {
    let isValid = false;
    const teacherBookings = this.teacherData.bookings;
    const reqStart = moment(start);
    const reqEnd = moment(start)
      .add(this.newBooking.courseTime, 'minute')
      .subtract(1, 'minute');

    if (teacherBookings && teacherBookings.length === 0) {
      return true;
    }

    isValid = teacherBookings.every((booking) => {
      const existingStart = moment(booking.start);
      const existingEnd = moment(booking.start)
        .add(booking.courseTime)
        .subtract(1, 'minute');
      return (
        (existingStart < reqStart && existingEnd < reqStart) ||
        (reqEnd < existingStart && reqEnd < existingEnd)
      );
    });

    return isValid;
  }

  selectDateTime(start: Date) {
    this.isClicked = false;
    this.newBooking.start = start;
    this.newBooking.end = moment(start).add(
      this.newBooking.courseTime,
      'minute'
    );

    Swal.fire({
      html: `
          <h4>レッスン変更確認</h4>
          <h4>${moment(this.newBooking.oldStart).format(
            'MM月DD日 HH:mm'
          )}〜</h4><br>
          の予約を
          <h4>${moment(this.newBooking.start).format('MM月DD日 HH:mm')}〜</h4>
          <br>
          に変更しますか？<br><br>
          <p>※開始24時間未満の予約は日時変更できなくなります</p>`,
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
    debugger;
    this.bookingService.updateBooking(this.newBooking).subscribe(
      (Message) => {
        this.isClicked = false;
        this.showSwalSuccess();
      },
      (errorResponse: HttpErrorResponse) => {
        this.isClicked = false;
        console.error(errorResponse);
        this.errors = errorResponse.error.errors;
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
