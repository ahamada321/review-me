import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/services/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-teacher-manage-students',
  templateUrl: './teacher-manage-students.component.html',
  styleUrls: ['./teacher-manage-students.component.scss'],
})
export class TeacherManageStudentsComponent implements OnInit {
  myStudents!: User[];

  constructor(
    private auth: MyOriginAuthService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getMyStudents();
  }
  ngOnDestroy() {}

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
          をリストから削除しますか？
         `,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#51cbce',
      cancelButtonColor: '#9A9A9A',
      confirmButtonText: '申請する',
      cancelButtonText: 'キャンセル',
      reverseButtons: true,
      allowOutsideClick: false,
    }).then((result) => {
      if (!result.dismiss) {
        this.userService.removeUserRequest(student).subscribe(
          (success: any) => {
            Swal.fire({
              title: '削除しました',
              // text: '生徒が承認ボタンを押すまでお待ちください',
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
                confirmButton: 'btn btn-primary btn-lg',
              },
              buttonsStyling: false,
            });
          }
        );
      }
    });
  }
}
