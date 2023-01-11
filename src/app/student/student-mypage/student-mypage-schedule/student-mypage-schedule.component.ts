import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-mypage-schedule',
  templateUrl: './student-mypage-schedule.component.html',
  styleUrls: ['./student-mypage-schedule.component.scss'],
})
export class StudentMypageScheduleComponent implements OnInit {
  active = 2;
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {}
}
