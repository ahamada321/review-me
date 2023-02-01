import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { Booking } from 'src/app/shared/booking-selecter/shared/booking.model';
import { BookingService } from 'src/app/shared/booking-selecter/shared/booking.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/services/user.model';

@Component({
  selector: 'app-student-change-booking',
  templateUrl: './student-change-booking.component.html',
  styleUrls: ['./student-change-booking.component.scss'],
})
export class StudentChangeBookingComponent implements OnInit {
  // isSelectedDateTime: boolean = false;
  selectedDate!: Date;
  minDate!: Date;
  maxDate!: Date;
  timeTables: any = [];
  isClicked: boolean = false;
  newBooking!: Booking;
  errors: any[] = [];
  studentData!: User;
  teacherData!: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public auth: MyOriginAuthService,
    private bookingService: BookingService, //  private dateTimeAdapter: DateTimeAdapter<any>
    private userService: UserService
  ) {}

  ngOnInit() {
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

        this.selectedDate = new Date(foundBooking.start);
        this.minDate = new Date(
          this.selectedDate.getFullYear(),
          this.selectedDate.getMonth(),
          1
        );
        this.maxDate = new Date(
          this.selectedDate.getFullYear(),
          this.selectedDate.getMonth() + 1,
          0
        );
        this.getMe();
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
        this.onDateSelect(this.selectedDate);
      },
      (errorResponse: HttpErrorResponse) => {
        this.errors = errorResponse.error.errors;
      }
    );
  }

  dayOffFilter = (date: Date | null): any => {
    const selectedDay = date!.getDay();
    const isDateBlock_flg = this.isDateBlock(date!);

    return (
      (selectedDay === 0 && this.teacherData.sun_enabled && !isDateBlock_flg) ||
      (selectedDay === 1 && this.teacherData.mon_enabled && !isDateBlock_flg) ||
      (selectedDay === 2 && this.teacherData.tue_enabled && !isDateBlock_flg) ||
      (selectedDay === 3 && this.teacherData.wed_enabled && !isDateBlock_flg) ||
      (selectedDay === 4 && this.teacherData.thu_enabled && !isDateBlock_flg) ||
      (selectedDay === 5 && this.teacherData.fri_enabled && !isDateBlock_flg) ||
      (selectedDay === 6 && this.teacherData.sat_enabled && !isDateBlock_flg)
    );
  };

  isDateBlock(selectedDate: Date) {
    const selected_date = moment(selectedDate).format('YYYY-MM-DD');

    for (let booking of this.teacherData.bookings) {
      if (booking.status === 'block') {
        if (selected_date === moment(booking.start).format('YYYY-MM-DD')) {
          return booking.allDay;
        }
      }
    }
    return false;
  }

  onDateSelect(date: Date) {
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
      return existingEnd < reqStart || reqEnd < existingStart;
    });

    return isValid;
  }

  selectDateTime(start: Date) {
    // this.isSelectedDateTime = true;s
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
