import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { Booking } from 'src/app/shared/booking-selecter/shared/booking.model';
import { BookingService } from 'src/app/shared/booking-selecter/shared/booking.service';
import { User } from 'src/app/shared/services/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-student-mypage',
  templateUrl: './student-mypage.component.html',
  styleUrls: ['./student-mypage.component.scss'],
})
export class StudentMypageComponent implements OnInit {
  active = 2;
  userData!: User;
  userId = this.auth.getUserId();
  upcomingBookings!: Booking[];
  finishedBookings!: Booking[];
  countBookings!: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public auth: MyOriginAuthService,
    private bookingService: BookingService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getMe();
    this.getFinishedBookings();
    this.getUpcomingBookings();
    this.getCountBookings();
  }

  getMe() {
    this.userService.getUserById(this.userId).subscribe(
      (foundUser) => {
        this.userData = foundUser;
      },
      (err) => {}
    );
  }

  getUpcomingBookings() {
    this.bookingService.getUpcomingBookings().subscribe(
      (foundUpcomingBookings: any) => {
        this.upcomingBookings = foundUpcomingBookings;
      },
      (err: any) => {}
    );
  }

  getCountBookings() {
    this.bookingService.countUserBookings(this.userId).subscribe(
      (foundCountBookings) => {
        this.countBookings = foundCountBookings;
      },
      (error) => {}
    );
  }

  getFinishedBookings() {
    this.bookingService.getFinishedBookings().subscribe(
      (foundFinishedBookings) => {
        this.finishedBookings = foundFinishedBookings;
      },
      (err) => {}
    );
  }

  onEdit(booking: any) {}

  convertJST(time: any) {
    // return moment(time).subtract(9, 'hour').format('MM月 DD日 HH:mm 〜');
    return moment(time).format('MM月 DD日 HH:mm 〜');
  }

  isLess24Hours(startAt: any) {
    const timeNow = moment(); // Attention: just "moment()" is already applied timezone!
    return moment(startAt).diff(timeNow.add(1, 'day')) < 0;
  }
}
