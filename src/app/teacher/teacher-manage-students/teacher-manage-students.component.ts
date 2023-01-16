import { Component, OnInit } from '@angular/core';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-manage-students',
  templateUrl: './teacher-manage-students.component.html',
  styleUrls: ['./teacher-manage-students.component.scss'],
})
export class TeacherManageStudentsComponent implements OnInit {
  students = [
    {
      _id: 1,
      name: '鈴木太郎',
    },
    {
      _id: 2,
      name: '鈴木太郎',
    },
  ];

  constructor(private auth: MyOriginAuthService, private router: Router) {}

  ngOnInit() {}
  ngOnDestroy() {}
}
