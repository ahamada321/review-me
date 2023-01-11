import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-student-mypage',
  templateUrl: './student-mypage.component.html',
  styleUrls: ['./student-mypage.component.scss'],
})
export class StudentMypageComponent implements OnInit {
  active = 1;
  bookings = [{ startAt: 123 }, { startAt: 2334 }];
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {}

  onEdit(booking: any) {}

  convertJST(time: any) {
    return moment(time).subtract(9, 'hour').format('YYYY/MM/DD');
  }
}
