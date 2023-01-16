import { Component, OnInit } from '@angular/core';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-notification',
  templateUrl: './student-notification.component.html',
  styleUrls: ['./student-notification.component.scss'],
})
export class StudentNotificationComponent implements OnInit {
  constructor(private auth: MyOriginAuthService, private router: Router) {}

  ngOnInit() {}
  ngOnDestroy() {}
}
