import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Booking } from 'src/app/shared/booking-selecter/shared/booking.model';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { BookingService } from 'src/app/shared/booking-selecter/shared/booking.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/services/user.model';

@Component({
  selector: 'app-student-booking',
  templateUrl: './student-booking.component.html',
  styleUrls: ['./student-booking.component.scss'],
})
export class StudentBookingComponent implements OnInit {
  // isSelectedDateTime: boolean = false;
  selectedDate!: Date;
  minDate!: Date;
  maxDate!: Date;
  timeTables: any = [];
  isDateBlock_flg: boolean = false;
  isClicked: boolean = false;
  newBooking: Booking = new Booking();
  errors: any;
  userId = this.auth.getUserId();
  studentData!: User;
  teacherData!: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public auth: MyOriginAuthService,
    private bookingService: BookingService,
    private userService: UserService
  ) {}

  ngOnInit() {
    const now = new Date();
    this.selectedDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    this.minDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    this.maxDate = new Date(now.getFullYear(), now.getMonth() + 2, 0);

    this.getMe();
  }

  getMe() {
    this.userService.getUserById(this.userId).subscribe(
      (foundUser) => {
        this.studentData = foundUser;
        if (!foundUser.teachers[0]) {
          this.showSwalError();
          return;
        }
        this.newBooking.title = this.auth.getUsername();
        this.newBooking.teacher = foundUser.teachers[0]; //tmp
        this.newBooking.student = this.userId;
        this.newBooking.courseTime = foundUser.courseTime;
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
        this.onDateSelect(this.selectedDate);
      },
      (errorResponse: HttpErrorResponse) => {
        this.errors = errorResponse.error.errors;
      }
    );
  }

  dayOffFilter = (date: Date | null): any => {
    const selectedDay = date!.getDay();
    return (
      (selectedDay === 0 && this.teacherData.sun_enabled) ||
      (selectedDay === 1 && this.teacherData.mon_enabled) ||
      (selectedDay === 2 && this.teacherData.tue_enabled) ||
      (selectedDay === 3 && this.teacherData.wed_enabled) ||
      (selectedDay === 4 && this.teacherData.thu_enabled) ||
      (selectedDay === 5 && this.teacherData.fri_enabled) ||
      (selectedDay === 6 && this.teacherData.sat_enabled)
    );
  };

  onDateSelect(date: Date) {
    this.isDateBlock_flg = false;
    this.isDateBlock(date);
    const selectedDay = date.getDay();
    let mTimeTables = [];
    let mEndAt = null;
    let mStartAt = null;
    if (selectedDay == 0 && this.teacherData.sun_enabled) {
      // Sunday
      mEndAt = moment(this.teacherData.sun_end).set({
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
      });
      mStartAt = moment(this.teacherData.sun_start).set({
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
      });
    }
    if (selectedDay == 1 && this.teacherData.mon_enabled) {
      // Monday
      mEndAt = moment(this.teacherData.mon_end).set({
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
      });
      mStartAt = moment(this.teacherData.mon_start).set({
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
      });
    }
    if (selectedDay == 2 && this.teacherData.tue_enabled) {
      // Tuesday
      mEndAt = moment(this.teacherData.tue_end).set({
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
      });
      mStartAt = moment(this.teacherData.tue_start).set({
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
      });
    }
    if (selectedDay == 3 && this.teacherData.wed_enabled) {
      // Wednesday
      mEndAt = moment(this.teacherData.wed_end).set({
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
      });
      mStartAt = moment(this.teacherData.wed_start).set({
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
      });
    }
    if (selectedDay == 4 && this.teacherData.thu_enabled) {
      // Thursday
      mEndAt = moment(this.teacherData.thu_end).set({
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
      });
      mStartAt = moment(this.teacherData.thu_start).set({
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
      });
    }
    if (selectedDay == 5 && this.teacherData.fri_enabled) {
      // Friday
      mEndAt = moment(this.teacherData.fri_end).set({
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
      });
      mStartAt = moment(this.teacherData.fri_start).set({
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
      });
    }
    if (selectedDay == 6 && this.teacherData.sat_enabled) {
      // Saturday
      mEndAt = moment(this.teacherData.sat_end).set({
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
      });
      mStartAt = moment(this.teacherData.sat_start).set({
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
      });
    }
    while (mStartAt! < mEndAt!) {
      if (!this.isPastDateTime(mStartAt)) {
        mTimeTables.push(moment(mStartAt));
      }
      mStartAt!.add(30, 'minutes');
    }
    this.timeTables = mTimeTables;
    // this.newBookingInfo.emit(null);
  }

  isDateBlock(selectedDate: Date) {
    const selected_date = moment(selectedDate)
      .subtract(1, 'month')
      .format('YYYY-MM-DD'); // Subtract 1 month to adapt NgbDateStruct to moment()

    for (let booking of this.teacherData.bookings) {
      if (booking.status === 'block') {
        if (selected_date === moment(booking.start).format('YYYY-MM-DD')) {
          this.isDateBlock_flg = true;
        }
      }
    }
  }

  private isPastDateTime(start: any) {
    return moment(start).diff(moment()) < 0; // Attention: just "moment()" is already applied timezone!
  }

  isValidBooking(start: any) {
    let isValid = false;
    const reqStart = moment(start);
    const reqEnd = moment(start)
      .add(this.newBooking.courseTime, 'minute')
      .subtract(1, 'minute');

    const teacherBookings = this.teacherData.bookings;
    if (teacherBookings && teacherBookings.length === 0) {
      return true;
    }

    isValid = teacherBookings.every((booking) => {
      const existingStart = moment(booking.start);
      const existingEnd = moment(booking.end).subtract(1, 'minute');
      return existingEnd < reqStart || reqEnd < existingEnd;
    });

    return isValid;
  }

  selectDateTime(start: any) {
    // this.isSelectedDateTime = true;
    this.isClicked = false;
    this.newBooking.start = start;
    this.newBooking.end = moment(start).add(
      this.newBooking.courseTime,
      'minute'
    );

    Swal.fire({
      html: `
          <h4>予約日時</h4>
          <h3>${moment(start).format('MM月 DD日 HH:mm')} 〜</h3>
          <br>
          で予約しますか？<br><br>
          <p>※レッスン開始24時間前まで変更可能です。</p>`,
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
    this.bookingService.createBooking(this.newBooking).subscribe(
      (newBooking) => {
        this.newBooking = new Booking();
        this.isClicked = false;
        this.showSwalSuccess();
      },
      (errorResponse: HttpErrorResponse) => {
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

  private showSwalError() {
    Swal.fire({
      title: '担当の先生がいません',
      text: '通知から先に担当の先生からのリクエストを承認してください',
      icon: 'error',
      customClass: {
        confirmButton: 'btn btn-danger btn-lg',
      },
      confirmButtonText: '通知へ行く',
      buttonsStyling: false,
    }).then(() => {
      this.router.navigate(['/student/notification']);
    });
  }
}
