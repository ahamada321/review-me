import { Component, OnInit } from '@angular/core';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/services/user.model';
import { UserService } from 'src/app/shared/services/user.service';

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
}
