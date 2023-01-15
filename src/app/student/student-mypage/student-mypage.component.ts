import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-student-mypage',
  templateUrl: './student-mypage.component.html',
  styleUrls: ['./student-mypage.component.scss'],
})
export class StudentMypageComponent implements OnInit {
  active = 2;
  student: any;
  bookings = [
    {
      createdAt: moment(),
      startAt: moment(),
      oldStartAt: moment(),
      courseTime: 60,
      memo: 'メモを記入',
      student: 'object_id',
      teacher: '鈴木太郎',
      status: 'pending',
    },
    {
      createdAt: moment(),
      startAt: moment(),
      oldStartAt: moment(),
      courseTime: 60,
      memo: 'メモを記入',
      student: 'object_id',
      teacher: '鈴木太郎',
      status: 'pending',
    },
  ];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public auth: MyOriginAuthService
  ) {}

  ngOnInit() {
    this.student = this.auth.getUserById(this.auth.getUserId());
    this.student.bookings = this.bookings;
  }

  onEdit(booking: any) {}

  convertJST(time: any) {
    return moment(time).subtract(9, 'hour').format('MM月 DD日 HH:mm 〜');
  }
}
