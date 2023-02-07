import { Component, OnInit } from '@angular/core';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { Booking } from 'src/app/shared/booking-selecter/shared/booking.model';
import { BookingService } from 'src/app/shared/booking-selecter/shared/booking.service';

@Component({
  selector: 'app-teacher-student-booking-memo',
  templateUrl: './teacher-student-booking-memo.component.html',
  styleUrls: ['./teacher-student-booking-memo.component.scss'],
})
export class TeacherStudentBookingMemoComponent implements OnInit {
  isClicked: boolean = false;
  bookingData!: Booking;
  studentId!: string;

  constructor(
    private auth: MyOriginAuthService,
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const bookingId = params['bookingId'];
      this.getBookingById(bookingId);
    });
  }

  getBookingById(bookingId: any) {
    this.bookingService.getBookingById(bookingId).subscribe(
      (foundBooking) => {
        this.bookingData = foundBooking;
        this.studentId = foundBooking.student;
      },
      (err: any) => {}
    );
  }

  updateBookingMemo(updateBookingMemoForm: NgForm) {
    this.isClicked = true;
    this.bookingService.updateBooking(this.bookingData).subscribe(
      (result) => {
        this.showSwalSuccess();
      },
      (errorResponse: HttpErrorResponse) => {
        this.isClicked = false;
        console.error(errorResponse.error.errors);
        this.showSwalError();
      }
    );
  }

  private showSwalSuccess() {
    Swal.fire({
      icon: 'success',
      title: 'メモが更新されました！',
      customClass: {
        confirmButton: 'btn btn-primary btn-lg',
      },
      buttonsStyling: false,
    }).then((result) => {
      this.router.navigate(['/teacher/student-bookings/' + this.studentId]);
    });
  }

  private showSwalError() {
    Swal.fire({
      title: '通信エラー',
      text: 'もう一度ボタンを押しなおしてください',
      icon: 'error',
      customClass: {
        confirmButton: 'btn btn-danger btn-lg',
      },
      buttonsStyling: false,
    });
  }
}
