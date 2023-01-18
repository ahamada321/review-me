import { Component, OnInit } from '@angular/core';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-teacher-edit',
  templateUrl: './teacher-edit.component.html',
  styleUrls: ['./teacher-edit.component.scss'],
})
export class TeacherEditComponent implements OnInit {
  userData: any;
  state_info_booking = true;
  state_info_change = true;
  state_info_cancel = true;
  state_info1 = true;
  data: Date = new Date();

  constructor(private auth: MyOriginAuthService, private router: Router) {}

  ngOnInit() {}

  private showSwalSuccess() {
    Swal.fire({
      // title: 'User infomation has been updated!',
      icon: 'success',
      text: 'ユーザー情報が更新されました！',
      customClass: {
        confirmButton: 'btn btn-primary btn-lg',
      },
      buttonsStyling: false,
      timer: 5000,
    }).then(() => {
      this.router.navigate(['/rentals', { registered: 'success' }]);
    });
  }
}
