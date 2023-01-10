import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MyOriginAuthService } from 'src/app/auth/service/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss'],
})
export class LoginPopupComponent implements OnInit, OnDestroy {
  user: any;

  loginForm!: FormGroup;
  errors: any[] = [];
  notifyMessage: string = '';

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private auth: MyOriginAuthService,
    private router: Router,
    private ref: ChangeDetectorRef,
    private location: Location
  ) {}

  ngOnInit() {
    var body = document.getElementsByTagName('body')[0];
    // body.classList.add('full-screen');
    body.classList.add('login-popup');

    // this.seeFBLoginState();
    this.initForm();
  }

  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    //   body.classList.remove('full-screen');
    body.classList.remove('login-popup');
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  isInvalidForm(fieldname: any): boolean {
    return (
      this.loginForm.controls[fieldname].invalid &&
      (this.loginForm.controls[fieldname].dirty ||
        this.loginForm.controls[fieldname].touched)
    );
  }

  login() {
    this.auth.login(this.loginForm.value).subscribe(
      (token) => {
        this.activeModal.close('Close click');

        let _locationExamples = this.location.path();
        const isLocationOfRentals =
          _locationExamples.split('/')[1] === 'rentals';
        if (!isLocationOfRentals) {
          this.router.navigate(['/rentals/manage']);
        }
      },
      (errorResponse: HttpErrorResponse) => {
        console.error(errorResponse);
        this.errors = errorResponse.error.errors;
      }
    );
  }
}
