import { Component, OnInit } from '@angular/core';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/services/user.model';

@Component({
  selector: 'app-student-notification',
  templateUrl: './student-notification.component.html',
  styleUrls: ['./student-notification.component.scss'],
})
export class StudentNotificationComponent implements OnInit {
  userData!: User;

  isApproved = false;

  constructor(private auth: MyOriginAuthService, private router: Router) {}

  approve() {
    this.isApproved = true;
  }

  ngOnInit() {
    this.getMe();
  }
  ngOnDestroy() {}

  getMe() {
    const userId = this.auth.getUserId();
    this.auth.getUserById(userId).subscribe(
      (foundUser) => {
        this.userData = foundUser;
        // debugger;
      },
      (err) => {}
    );
  }
}
