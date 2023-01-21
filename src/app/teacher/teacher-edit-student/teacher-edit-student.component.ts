import { Component, OnInit } from '@angular/core';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from 'src/app/shared/services/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-teacher-edit-student',
  templateUrl: './teacher-edit-student.component.html',
  styleUrls: ['./teacher-edit-student.component.scss'],
})
export class TeacherEditStudentComponent implements OnInit {
  studentData!: User;
  isClicked: boolean = false;

  dropdownCourseTypeLists = [
    { id: 2, itemName: '2回/月' },
    { id: 3, itemName: '3回/月' },
    { id: 4, itemName: '4回/月' },
  ];

  // Select course time
  dropdownCourseLists = [
    { id: 30, itemName: '30分' },
    { id: 40, itemName: '40分' },
    { id: 60, itemName: '60分' },
  ];

  constructor(
    private auth: MyOriginAuthService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const studentId = params['studentId'];
      this.getStudentById(studentId);
    });
  }

  getStudentById(studentId: any) {
    this.userService.getUserById(studentId).subscribe(
      (foundStudent: any) => {
        this.studentData = foundStudent;
      },
      (err: any) => {}
    );
  }

  updateStudent(updateStudentForm: NgForm) {
    this.isClicked = true;
    this.userService
      .updateUser(this.studentData._id, updateStudentForm.value)
      .subscribe(
        (UserUpdated) => {
          this.isClicked = false;
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
      // title: 'User infomation has been updated!',
      icon: 'success',
      title: '生徒情報が更新されました！',
      customClass: {
        confirmButton: 'btn btn-primary btn-lg',
      },
      buttonsStyling: false,
    }).then(() => {
      this.router.navigate(['/teacher/manage']);
    });
  }

  private showSwalError() {
    Swal.fire({
      title: '通信エラー',
      text: 'もう一度報告ボタンを押しなおしてください',
      icon: 'error',
      customClass: {
        confirmButton: 'btn btn-danger btn-lg',
      },
      buttonsStyling: false,
    });
  }
}
