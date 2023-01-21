import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/shared/services/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss'],
})
export class ChangeEmailComponent implements OnInit {
  errors: any = [];
  userData!: User;
  userId = this.auth.getUserId();

  constructor(
    private auth: MyOriginAuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}

  updateUser(UserForm: NgForm) {
    this.auth.updateUser(this.userId, UserForm.value).subscribe(
      (Updated) => {
        this.showSwalSuccess();
      },
      (errorResponse: HttpErrorResponse) => {
        this.showSwalError();
        this.errors = errorResponse.error.errors;
      }
    );
  }

  private showSwalSuccess() {
    Swal.fire({
      title: 'メールアドレスが変更されました！',
      icon: 'success',
      customClass: {
        confirmButton: 'btn btn-primary btn-lg',
      },
      buttonsStyling: false,
    }).then(() => {
      this.auth.logout();
      this.router.navigate(['/login']);
    });
  }

  private showSwalError() {
    Swal.fire({
      title: '通信エラー',
      text: 'もう一度メールアドレス変更ボタンを押しなおしてください',
      icon: 'error',
      customClass: {
        confirmButton: 'btn btn-danger btn-lg',
      },
      buttonsStyling: false,
    });
  }
}
