import { Component, OnInit } from '@angular/core';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/services/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import * as moment from 'moment';
import { HttpErrorResponse } from '@angular/common/http';
import { Booking } from 'src/app/shared/booking-selecter/shared/booking.model';
import { BookingService } from 'src/app/shared/booking-selecter/shared/booking.service';

@Component({
  selector: 'app-teacher-student-bookings',
  templateUrl: './teacher-student-bookings.component.html',
  styleUrls: ['./teacher-student-bookings.component.scss'],
})
export class TeacherStudentBookingsComponent implements OnInit {
  studentData!: User;
  active = 2;
  upcomingBookings!: Booking[];
  finishedBookings!: Booking[];
  countBookings!: number;

  constructor(
    private auth: MyOriginAuthService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const studentId = params['studentId'];
      this.getStudentById(studentId);
      this.getUpcomingBookings(studentId);
      this.getFinishedBookings(studentId);
    });
  }

  getStudentById(studentId: any) {
    this.userService.getUserById(studentId).subscribe(
      (foundStudent: any) => {
        this.studentData = foundStudent;
      },
      (err: any) => {}
    );
  }

  getUpcomingBookings(studentId: any) {
    this.bookingService.getUpcomingBookings(studentId).subscribe(
      (foundUpcomingBookings: any) => {
        this.upcomingBookings = foundUpcomingBookings;
      },
      (err: any) => {}
    );
  }

  getFinishedBookings(studentId: any) {
    this.bookingService.getFinishedBookings(studentId).subscribe(
      (foundFinishedBookings) => {
        this.finishedBookings = foundFinishedBookings;
      },
      (err) => {}
    );
  }

  convertJST(time: any) {
    // return moment(time).subtract(9, 'hour').format('MM月 DD日 HH:mm 〜');
    return moment(time).format('YYYY年 MM月 DD日 HH:mm 〜');
  }
}
