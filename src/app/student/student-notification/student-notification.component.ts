import { Component, OnInit } from '@angular/core';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/services/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-student-notification',
  templateUrl: './student-notification.component.html',
  styleUrls: ['./student-notification.component.scss'],
})
export class StudentNotificationComponent implements OnInit {
  userData!: User;

  constructor(
    private auth: MyOriginAuthService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getMe();
  }

  ngOnDestroy() {}

  getMe() {
    const userId = this.auth.getUserId();
    this.userService.getUserById(userId).subscribe(
      (foundUser) => {
        this.userData = foundUser;
      },
      (err) => {}
    );
  }

  acceptAddUserRequest(pendingTeacher: any) {
    this.userService.acceptAddUserRequest(pendingTeacher).subscribe(
      (success: any) => {
        Swal.fire({
          title: '承認しました！',
          text: '担当の先生が登録されました。',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary btn-lg',
          },
          buttonsStyling: false,
        }).then((result) => {
          this.router.navigate(['/student']);
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
            confirmButton: 'btn btn-primary btn-lg',
          },
          buttonsStyling: false,
        });
      }
    );
  }
}
