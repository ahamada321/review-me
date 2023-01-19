import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { User } from 'src/app/shared/services/user.model';

@Component({
  selector: 'app-student-mypage',
  templateUrl: './student-mypage.component.html',
  styleUrls: ['./student-mypage.component.scss'],
})
export class StudentMypageComponent implements OnInit {
  active = 2;
  userData!: User;
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
    this.getMe();
  }

  getMe() {
    const userId = this.auth.getUserId();
    this.auth.getUserById(userId).subscribe(
      (foundUser) => {
        this.userData = foundUser;
      },
      (err) => {}
    );
  }

  onEdit(booking: any) {}

  convertJST(time: any) {
    return moment(time).subtract(9, 'hour').format('MM月 DD日 HH:mm 〜');
  }
}
