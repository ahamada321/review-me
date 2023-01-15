import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-teacher-mypage',
  templateUrl: './teacher-mypage.component.html',
  styleUrls: ['./teacher-mypage.component.scss'],
})
export class TeacherMypageComponent implements OnInit {
  active = 1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public auth: MyOriginAuthService
  ) {}

  ngOnInit() {}
}
