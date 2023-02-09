import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { MyOriginAuthService } from "src/app/auth/shared/auth.service";
import listPlugin from "@fullcalendar/list";
import dayGridPlugin from "@fullcalendar/daygrid";
import { BookingService } from "src/app/shared/booking-selecter/shared/booking.service";
import { User } from "src/app/shared/services/user.model";
import { UserService } from "src/app/shared/services/user.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-teacher-mypage",
  templateUrl: "./teacher-mypage.component.html",
  styleUrls: ["./teacher-mypage.component.scss"],
})
export class TeacherMypageComponent implements OnInit {
  active = 2;
  myStudents!: User[];
  calendarOptions: any = {
    initialView: "dayGridMonth",
    plugins: [listPlugin, dayGridPlugin],
    locale: "ja",
    timezone: "Asia/Tokyo",
    navLinks: true,
    businessHours: true,
    dayMaxEventRows: true,
    views: {
      list: { buttonText: "一覧" },
      dayGridMonth: {
        buttonText: "月別",
        dayMaxEventRows: 3, // adjust to 3 only for dayGridMonth
      },
    },
    headerToolbar: {
      left: "prev,next",
      center: "title",
      right: "listMonth,dayGridMonth",
    },

    events: [],
    eventClick: this.handleEventClick.bind(this),
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public auth: MyOriginAuthService,
    private bookingService: BookingService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getBookings();
    this.getMyStudents();
  }

  getBookings() {
    this.bookingService.getUserBookings(this.auth.getUserId()).subscribe(
      (foundBookings) => {
        this.calendarOptions.events = foundBookings;
      },
      (error) => {}
    );
  }
  getMyStudents() {
    this.userService.getMyStudents().subscribe(
      (foundStudents) => {
        this.myStudents = foundStudents;
      },
      (err) => {}
    );
  }
  removeUserRequest(student: any) {
    Swal.fire({
      html: `<h5>${student.username}さん</h5>
          を担当から外しますか？
         `,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#f5593d",
      cancelButtonColor: "#9A9A9A",
      confirmButtonText: "外す",
      cancelButtonText: "キャンセル",
      reverseButtons: true,
      allowOutsideClick: false,
    }).then((result) => {
      if (!result.dismiss) {
        this.userService.removeUserRequest(student).subscribe(
          (success: any) => {
            Swal.fire({
              title: "担当から外しました",
              // text: '生徒が承認ボタンを押すまでお待ちください',
              icon: "success",
              customClass: {
                confirmButton: "btn btn-primary btn-lg",
              },
              buttonsStyling: false,
            }).then((result) => {
              const index = this.myStudents.findIndex((x) => x._id === student._id);
              this.myStudents.splice(index, 1); // Delete event from array.
            });
          },
          (errorResponse: HttpErrorResponse) => {
            console.error(errorResponse);
            const error = errorResponse.error.errors[0];
            Swal.fire({
              title: `${error.title}`,
              text: `${error.detail}`,
              icon: "error",
              customClass: {
                confirmButton: "btn btn-primary btn-lg",
              },
              buttonsStyling: false,
            });
          }
        );
      }
    });
  }
  handleEventClick(clickInfo: any) {
    if (clickInfo.event.title === "休み") {
      return;
    }
    const studentId = clickInfo.event.extendedProps.student;
    this.router.navigate(["/teacher/student-bookings/" + studentId]);
  }
}
