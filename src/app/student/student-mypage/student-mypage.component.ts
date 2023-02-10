import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import * as moment from "moment";
import { MyOriginAuthService } from "src/app/auth/shared/auth.service";
import { Booking } from "src/app/shared/booking-selecter/shared/booking.model";
import { BookingService } from "src/app/shared/booking-selecter/shared/booking.service";
import { User } from "src/app/shared/services/user.model";
import { UserService } from "src/app/shared/services/user.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-student-mypage",
  templateUrl: "./student-mypage.component.html",
  styleUrls: ["./student-mypage.component.scss"],
})
export class StudentMypageComponent implements OnInit {
  active = 2;
  userData!: User;
  userId = this.auth.getUserId();
  upcomingBookings!: Booking[];
  finishedBookings!: Booking[];
  countThisMonthBookings!: number;
  countNextMonthBookings!: number;
  userCreatedMonth!: Date;
  thisMonth!: Date;

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
    this.getThisMonthBookingsCounts();
    this.getNextMonthBookingsCounts();
  }

  getMe() {
    this.userService.getUserById(this.userId).subscribe(
      (foundUser) => {
        this.userData = foundUser;
        const createdAt = new Date(foundUser.createdAt);
        this.userCreatedMonth = new Date(
          createdAt.getFullYear(),
          createdAt.getMonth(),
          1
        );
        const now = new Date();
        this.thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
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

  getThisMonthBookingsCounts() {
    this.bookingService.countUserBookings(this.userId).subscribe(
      (foundThisMonthCounts) => {
        this.countThisMonthBookings = foundThisMonthCounts;
      },
      (error) => {}
    );
  }

  getNextMonthBookingsCounts() {
    this.bookingService.countUserBookings(this.userId, 1).subscribe(
      (foundNextMonthCounts) => {
        this.countNextMonthBookings = foundNextMonthCounts;
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

  teacherMemo(booking: Booking) {
    Swal.fire({
      title: "先生からのメモ",
      html: `
      <h6>${booking.memo} </h6>`,
      allowOutsideClick: false,
      customClass: {
        confirmButton: "btn btn-primary btn-lg",
      },
      buttonsStyling: false,
    });
  }

  isLess24Hours(startAt: any) {
    const timeNow = moment(); // Attention: just "moment()" is already applied timezone!
    return moment(startAt).diff(timeNow.add(1, "day")) < 0;
  }

  convertJST(time: any) {
    // return moment(time).subtract(9, 'hour').format('MM月 DD日 HH:mm 〜');
    return moment(time).format("MM月 DD日 HH:mm 〜");
  }
}
