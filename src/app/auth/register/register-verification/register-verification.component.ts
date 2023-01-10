import { Component, OnInit } from '@angular/core';
import { MyOriginAuthService } from '../../service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { LoginPopupComponent } from '../../login-popup/login-popup.component';

@Component({
  selector: 'app-register-verification',
  templateUrl: './register-verification.component.html',
  styleUrls: ['./register-verification.component.scss'],
})
export class RegisterVerificationComponent implements OnInit {
  errors: any[] = [];
  notifyMessage: string = '';

  constructor(
    private auth: MyOriginAuthService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    let navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');

    this.route.params.subscribe((params) => {
      if (params['registered'] === 'success') {
        this.notifyMessage =
          'You have been successfully registerd. You can login now!';
      }

      this.userActivation(params['verifyToken']);
    });
  }

  userActivation(verifyToken: any) {
    this.auth.userActivation(verifyToken).subscribe(
      (result) => {
        this.showSwal('success');
      },
      (errorResponse: HttpErrorResponse) => {
        console.error(errorResponse);
        this.showSwal('failed');
      }
    );
  }

  showSwal(type: any) {
    if (type == 'success') {
      Swal.fire({
        icon: 'success',
        title: 'アクティベーション完了',
        text: 'ログイン出来るようになりました！',
        customClass: {
          confirmButton: 'btn btn-primary btn-lg',
        },
        buttonsStyling: false,
        allowOutsideClick: false,
      }).then(() => {
        this.modalLoginOpen();
      });
    } else if (type == 'failed') {
      // Maybe won't need URL expired pattern.
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: 'URLが期限切れです',
        customClass: {
          confirmButton: 'btn btn-danger btn-lg',
        },
        buttonsStyling: false,
        allowOutsideClick: false,
      }).then(() => {
        this.router.navigate(['/']);
      });
    }
  }

  modalLoginOpen() {
    this.router.navigate(['/']);
    this.modalService.open(LoginPopupComponent, { backdrop: 'static' });
  }
}
