// import { Component, OnInit } from '@angular/core';
// import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
// import { NgForm } from '@angular/forms';
// import { Router } from '@angular/router';
// import { UserService } from 'src/app/shared/services/user.service';
// import { HttpErrorResponse } from '@angular/common/http';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import { EventClickArg, EventInput } from '@fullcalendar/core';

// import Swal from 'sweetalert2';
// import * as moment from 'moment';
// import { BookingService } from 'src/app/shared/booking-selecter/shared/booking.service';

// @Component({
//   selector: 'app-teacher-2-block',
//   templateUrl: './teacher-2-block.component.html',
//   styleUrls: ['./teacher-2-block.component.scss'],
// })
// export class TeacherBlock2Component implements OnInit {
//   isClicked: boolean = false;
//   errors: any = [];
//   userData: any;
//   userId = this.auth.getUserId();
//   calendarOptions: any = {
//     initialView: 'dayGridMonth',
//     plugins: [dayGridPlugin, interactionPlugin],
//     locale: 'ja',
//     timezone: 'Asia/Tokyo',
//     navLinks: false,
//     longPressDelay: '300',
//     selectable: 'true',
//     events: [],
//     dateClick: this.handleDateClick.bind(this),
//   };

//   constructor(
//     private auth: MyOriginAuthService,
//     private router: Router,
//     private userService: UserService,
//     private bookingService: BookingService
//   ) {}

//   ngOnInit() {
//     this.getMe();
//   }

//   getMe() {
//     this.userService.getUserById(this.userId).subscribe(
//       (foundUser) => {
//         this.userData = foundUser;
//         this.calendarOptions.events = foundUser.bookings;
//       },
//       (errorResponse: HttpErrorResponse) => {
//         this.errors = errorResponse.error.errors;
//       }
//     );
//   }

//   handleDateClick(arg: any) {
//     Swal.fire({
//       icon: 'info',
//       title: '以下日時を休みにしますか？',
//       text: arg.dateStr,
//       confirmButtonColor: '#51cbce',
//       cancelButtonColor: '#9A9A9A',
//       confirmButtonText: '休み',
//       cancelButtonText: 'キャンセル',
//       showCancelButton: true,
//       allowOutsideClick: false,
//       reverseButtons: true,
//     }).then((result) => {
//       if (result.value) {
//         const event: EventInput = {
//           // id: '',
//           title: '休み',
//           allDay: true,
//           color: '#ff9f89',
//           start: arg.dateStr,
//           end: arg.dateStr,
//           teacher: this.userId,
//         };
//         this.createDateBlockBooking(event);
//       }
//     });
//   }

//   private createDateBlockBooking(event: any) {
//     this.bookingService.createDateBlockBooking(event).subscribe(
//       (savedBooking) => {
//         event._id = savedBooking._id;
//         let event_tmp = this.calendarOptions.events;
//         this.calendarOptions.events = [];
//         event_tmp.push(event);
//         this.calendarOptions.events = event_tmp;
//       },
//       (err) => {}
//     );
//   }
// }
