import { Component, OnInit } from '@angular/core';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { Booking } from 'src/app/shared/booking-selecter/shared/booking.model';
import { User } from 'src/app/shared/services/user.model';

import { HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { BookingService } from 'src/app/shared/booking-selecter/shared/booking.service';

@Component({
  selector: 'app-teacher-block',
  templateUrl: './teacher-block.component.html',
  styleUrls: ['./teacher-block.component.scss'],
})
export class TeacherBlockComponent implements OnInit {
  selectedDate!: Date;
  minDate!: Date;
  maxDate!: Date;
  userId = this.auth.getUserId();
  userData!: User;
  errors: any = [];
  timeTables: any = [];
  isDateBlock_flg: boolean = false;
  newBooking: Booking = new Booking();
  start!: NgbTimeStruct;
  end!: NgbTimeStruct;

  constructor(
    private auth: MyOriginAuthService,
    private router: Router,
    private userService: UserService,
    private bookingService: BookingService
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
        this.userData = foundUser;
        this.newBooking.title = '休み';
        this.newBooking.color = '#f5593d';
        this.newBooking.teacher = this.userId;
        this.start = { hour: 13, minute: 30, second: 0 };
        this.end = { hour: 14, minute: 30, second: 0 };
      },
      (errorResponse: HttpErrorResponse) => {
        this.errors = errorResponse.error.errors;
      }
    );
  }

  dayOffFilter = (date: Date | null): any => {
    const selectedDay = date!.getDay();
    return (
      (selectedDay === 0 && this.userData.sun_enabled) ||
      (selectedDay === 1 && this.userData.mon_enabled) ||
      (selectedDay === 2 && this.userData.tue_enabled) ||
      (selectedDay === 3 && this.userData.wed_enabled) ||
      (selectedDay === 4 && this.userData.thu_enabled) ||
      (selectedDay === 5 && this.userData.fri_enabled) ||
      (selectedDay === 6 && this.userData.sat_enabled)
    );
  };

  addDayOffConfirmation(dateBlockForm: NgForm) {
    if (this.newBooking.allDay) {
      this.showSwalBlockAllDayConfirmation(dateBlockForm);
    } else {
      this.showSwalBlockSpotTimeConfirmation(dateBlockForm);
    }
  }

  showSwalBlockAllDayConfirmation(dateBlockForm: NgForm) {
    this.newBooking.start = moment(this.selectedDate).set({
      hour: 0,
      minute: 0,
    });
    this.newBooking.end = moment(this.selectedDate).set({
      hour: 23,
      minute: 59,
    });
    this.newBooking.display = 'background';

    Swal.fire({
      html: `<h5>${moment(this.selectedDate).format('MM月DD日')}</h5>
          の予約受付を終日ブロックしますか？
         `,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#51cbce',
      cancelButtonColor: '#9A9A9A',
      confirmButtonText: 'はい',
      cancelButtonText: 'キャンセル',
      reverseButtons: true,
      allowOutsideClick: false,
    }).then((result) => {
      if (!result.dismiss) {
        this.bookingService.createBooking(this.newBooking).subscribe(
          (success: any) => {
            Swal.fire({
              title: 'ブロックしました',

              icon: 'success',
              customClass: {
                confirmButton: 'btn btn-primary btn-lg',
              },
              buttonsStyling: false,
            }).then((result) => {
              this.router.navigate(['/teacher']);
            });
          },
          (errorResponse: HttpErrorResponse) => {
            console.error(errorResponse);
            const error = errorResponse.error.errors[0];
            Swal.fire({
              title: `${error.title}`,
              text: `${error.detail}`,
              icon: 'error',
              customClass: {
                confirmButton: 'btn btn-danger btn-lg',
              },
              buttonsStyling: false,
            });
          }
        );
      }
    });
  }

  showSwalBlockSpotTimeConfirmation(dateBlockForm: NgForm) {
    this.newBooking.start = moment(this.selectedDate).set(this.start);
    this.newBooking.end = moment(this.selectedDate).set(this.end);

    Swal.fire({
      html: `<h5>${this.newBooking.start.format(
        'MM月DD日 HH:mm'
      )} 〜 ${this.newBooking.end.format('HH:mm')}</h5>
          の予約受付をブロックしますか？
         `,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#51cbce',
      cancelButtonColor: '#9A9A9A',
      confirmButtonText: 'はい',
      cancelButtonText: 'キャンセル',
      reverseButtons: true,
      allowOutsideClick: false,
    }).then((result) => {
      if (!result.dismiss) {
        this.bookingService.createBooking(this.newBooking).subscribe(
          (success: any) => {
            Swal.fire({
              title: 'ブロックしました',

              icon: 'success',
              customClass: {
                confirmButton: 'btn btn-primary btn-lg',
              },
              buttonsStyling: false,
            }).then((result) => {
              this.router.navigate(['/teacher']);
            });
          },
          (errorResponse: HttpErrorResponse) => {
            console.error(errorResponse);
            const error = errorResponse.error.errors[0];
            Swal.fire({
              title: `${error.title}`,
              text: `${error.detail}`,
              icon: 'error',
              customClass: {
                confirmButton: 'btn btn-danger btn-lg',
              },
              buttonsStyling: false,
            });
          }
        );
      }
    });
  }
}
