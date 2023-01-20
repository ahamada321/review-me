import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { Booking } from 'src/app/shared/booking-selecter/shared/booking.model';
import { BookingService } from 'src/app/shared/booking-selecter/shared/booking.service';
import { User } from 'src/app/shared/services/user.model';

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public auth: MyOriginAuthService,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    this.getMe();
    this.getUpcomingBookings();
    this.getFinishedBookings();
  }

  getMe() {
    this.auth.getUserById(this.userId).subscribe(
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
}
