import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import { BookingService } from 'src/app/shared/booking-selecter/shared/booking.service';

@Component({
  selector: 'app-teacher-mypage',
  templateUrl: './teacher-mypage.component.html',
  styleUrls: ['./teacher-mypage.component.scss'],
})
export class TeacherMypageComponent implements OnInit {
  calendarOptions: any = {
    initialView: 'dayGridMonth',
    plugins: [listPlugin, dayGridPlugin],
    locale: 'ja',
    timezone: 'Asia/Tokyo',
    navLinks: true,
    businessHours: true,
    dayMaxEventRows: true,
    views: {
      list: { buttonText: '一覧' },
      dayGridMonth: {
        buttonText: '月別',
        dayMaxEventRows: 3, // adjust to 3 only for dayGridMonth
      },
    },
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'listMonth,dayGridMonth',
    },

    events: [],
    eventClick: this.handleEventClick.bind(this),
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public auth: MyOriginAuthService,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    this.getBookings();
  }

  getBookings() {
    this.bookingService.getUserBookings(this.auth.getUserId()).subscribe(
      (foundBookings) => {
        this.calendarOptions.events = foundBookings;
      },
      (error) => {}
    );
  }

  handleEventClick(clickInfo: any) {
    const studentId = clickInfo.event.extendedProps.student;
    this.router.navigate(['/teacher/student-bookings/' + studentId]);
  }
}
