import { Component, OnInit, OnDestroy } from '@angular/core';
import { MyOriginAuthService } from '../shared/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/services/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  date: Date = new Date();
  isTermsAgreed: boolean = false;
  isClicked: boolean = false;

  focus: any;
  focus1: any;
  focus2: any;
  focus3: any;

  formData: User = new User();

  errors: any[] = [];

  constructor(
    private auth: MyOriginAuthService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    let body = document.getElementsByTagName('body')[0];
    body.classList.add('full-screen');
    body.classList.add('register-page');
    let navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');

    // this.seeFBLoginState();
    this.route.params.subscribe((params) => {
      if (params['as'] == 'trainer') {
        this.showSwalNotification();
      }
    });
  }

  ngOnDestroy() {
    let body = document.getElementsByTagName('body')[0];
    body.classList.remove('full-screen');
    body.classList.remove('register-page');
    let navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
    if (navbar.classList.contains('nav-up')) {
      navbar.classList.remove('nav-up');
    }
  }

  register() {
    this.isClicked = true;
    this.auth.register(this.formData).subscribe(
      (newUser) => {
        if (newUser.isVerified) {
          this.showSwalSuccess();
        } else {
          this.router.navigate(['/register/sent']);
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.isClicked = false;
        console.error(errorResponse);
        this.errors = errorResponse.error.errors;
      }
    );
  }

  showSwalSuccess() {
    Swal.fire({
      icon: 'success',
      title: 'メンバー登録完了',
      text: '無事にログイン出来るようになりました！',
      customClass: {
        confirmButton: 'btn btn-primary btn-lg',
      },
      buttonsStyling: false,
      allowOutsideClick: false,
    }).then(() => {
      this.router.navigate(['/login']);
    });
  }

  showSwalNotification() {
    Swal.fire({
      icon: 'info',
      text: '新規会員登録後に出品できます。',
      customClass: {
        confirmButton: 'btn btn-primary btn-lg',
      },
      buttonsStyling: false,
    });
  }

  termsOpen(content: any) {
    this.modalService.open(content, { backdrop: 'static' });
  }
}
