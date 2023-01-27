import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { Router } from '@angular/router';
import { Booking } from 'src/app/shared/booking-selecter/shared/booking.model';
import { BookingService } from 'src/app/shared/booking-selecter/shared/booking.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-teacher-manage-blocks',
  templateUrl: './teacher-manage-blocks.component.html',
  styleUrls: ['./teacher-manage-blocks.component.scss'],
})
export class TeacherManageBlocksComponent implements OnInit {
  blockBookings!: Booking[];

  constructor(
    private auth: MyOriginAuthService,
    private router: Router,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    this.getBookings();
  }

  ngOnDestroy() {}

  getBookings() {
    this.bookingService
      .getUserDateBlockBookings(this.auth.getUserId())
      .subscribe(
        (foundBlockBookings) => {
          this.blockBookings = foundBlockBookings;
        },
        (error) => {}
      );
  }

  deleteConfirmation(booking: Booking) {
    if (booking.allDay) {
      this.showSwalDeleteAllDayConfirmation(booking);
    } else {
      this.showSwalDeleteSpotTimeConfirmation(booking);
    }
  }

  showSwalDeleteAllDayConfirmation(booking: Booking) {
    Swal.fire({
      html: `<h5>${moment(booking.start).format('MM月DD日')}</h5>
          の予約ブロックを削除しますか？
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
        this.bookingService.deleteBooking(booking._id).subscribe(
          (success: any) => {
            Swal.fire({
              title: '削除しました',

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

  showSwalDeleteSpotTimeConfirmation(booking: Booking) {
    Swal.fire({
      html:
        `<h5>${moment(booking.start).format('MM月DD日 HH:mm')} 〜 ${moment(
          booking.end
        ).format('HH:mm')}</h5>` +
        `の予約ブロックを削除しますか？
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
        this.bookingService.deleteBooking(booking._id).subscribe(
          (success: any) => {
            Swal.fire({
              title: '削除しました',

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
  // removeBlock(booking: any) {
  //   Swal.fire({
  //     html: `<h5>${moment(this.booking.start).format('MM月DD日')}さん</h5>
  //         をリストから削除しますか？
  //        `,
  //     icon: 'info',
  //     showCancelButton: true,
  //     confirmButtonColor: '#51cbce',
  //     cancelButtonColor: '#9A9A9A',
  //     confirmButtonText: '削除する',
  //     cancelButtonText: 'キャンセル',
  //     reverseButtons: true,
  //     allowOutsideClick: false,
  //   }).then((result) => {
  //     if (!result.dismiss) {
  //       this.userService.removeUserRequest(student).subscribe(
  //         (success: any) => {
  //           Swal.fire({
  //             title: '削除しました',
  //             // text: '生徒が承認ボタンを押すまでお待ちください',
  //             icon: 'success',
  //             customClass: {
  //               confirmButton: 'btn btn-primary btn-lg',
  //             },
  //             buttonsStyling: false,
  //           }).then((result) => {
  //             this.router.navigate(['/teacher']);
  //           });
  //         },
  //         (errorResponse: HttpErrorResponse) => {
  //           console.error(errorResponse);
  //           const error = errorResponse.error.errors[0];
  //           Swal.fire({
  //             title: `${error.title}`,
  //             text: `${error.detail}`,
  //             icon: 'error',
  //             customClass: {
  //               confirmButton: 'btn btn-primary btn-lg',
  //             },
  //             buttonsStyling: false,
  //           });
  //         }
  //       );
  //     }
  //   });
  // }
}
