import { Component, OnInit } from '@angular/core';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventClickArg, EventInput } from '@fullcalendar/core';

import Swal from 'sweetalert2';
import * as moment from 'moment';
import { Booking } from 'src/app/shared/booking-selecter/shared/booking.model';
import { BookingService } from 'src/app/shared/booking-selecter/shared/booking.service';

@Component({
  selector: 'app-teacher-block',
  templateUrl: './teacher-block.component.html',
  styleUrls: ['./teacher-block.component.scss'],
})
export class TeacherBlockComponent implements OnInit {
  isClicked: boolean = false;
  errors: any = [];
  userData: any;
  userId = this.auth.getUserId();
  calendarOptions: any = {
    longPressDelay: '300',
    selectable: 'true',
    calendarEvents: [],
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    locale: 'ja',
    businessHours: true,
    dayMaxEventRows: true,
    dateClick: this.handleDateClick.bind(this),
  };
  calendarEvents: any;

  constructor(
    private auth: MyOriginAuthService,
    private router: Router,
    private userService: UserService,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    this.getMe();
  }

  getMe() {
    this.userService.getUserById(this.userId).subscribe(
      (foundUser) => {
        this.userData = foundUser;
      },
      (errorResponse: HttpErrorResponse) => {
        this.errors = errorResponse.error.errors;
      }
    );
  }

  handleDateClick(arg: any) {
    Swal.fire({
      icon: 'info',
      title: '以下日時を休みにしますか？',
      text: arg.dateStr,
      confirmButtonColor: '#51cbce',
      cancelButtonColor: '#9A9A9A',
      confirmButtonText: '休み',
      cancelButtonText: 'キャンセル',
      showCancelButton: true,
      allowOutsideClick: false,
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        const event = {
          // id: '',
          title: '休み',
          allday: true,
          start: arg.dateStr,
          end: moment(arg.dateStr).add(1, 'day').format('YYYY-MM-DD'),
          teacher: this.userId,
        };
        console.log(event);
        this.createDateBlockBooking(event);
      }
    });
  }

  delay(arg0: number) {
    throw new Error('Method not implemented.');
  }

  private createDateBlockBooking(event: any) {
    this.bookingService.createDateBlockBooking(event).subscribe(
      (resultId) => {
        event.id = resultId;
        this.calendarEvents = this.calendarEvents.concat(event); // Update front UI
      },
      (err) => {}
    );
  }
}
