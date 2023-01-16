import { Component, OnInit } from '@angular/core';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-notification',
  templateUrl: './teacher-notification.component.html',
  styleUrls: ['./teacher-notification.component.scss'],
})
export class TeacherNotificationComponent implements OnInit {
  constructor(private auth: MyOriginAuthService, private router: Router) {}

  ngOnInit() {}
  ngOnDestroy() {}
}
