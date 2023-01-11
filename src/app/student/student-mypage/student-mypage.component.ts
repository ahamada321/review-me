import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-mypage',
  templateUrl: './student-mypage.component.html',
  styleUrls: ['./student-mypage.component.scss'],
})
export class StudentMypageComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {}
}
