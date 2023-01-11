import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teacher-mypage',
  templateUrl: './teacher-mypage.component.html',
  styleUrls: ['./teacher-mypage.component.scss'],
})
export class TeacherMypageComponent implements OnInit {
  active = 1;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {}
}
