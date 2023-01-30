import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactForm } from '../shared/contactform.model';
import { ContactFormService } from '../shared/contactform.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-form-contactus',
  templateUrl: './contact-form-contactus.component.html',
  styleUrls: ['./contact-form-contactus.component.scss'],
})
export class ContactFormContactusComponent implements OnInit, OnDestroy {
  contactusForm!: FormGroup;
  formData!: ContactForm;
  errorResponse!: HttpErrorResponse;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private contactformService: ContactFormService
  ) {}

  ngOnInit() {
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('contact-page');

    this.initForm();
  }
  ngOnDestroy() {
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
    if (navbar.classList.contains('nav-up')) {
      navbar.classList.remove('nav-up');
    }
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('contact-page');
  }

  initForm() {
    this.contactusForm = this.formBuilder.group({
      username: ['', { nonNullable: true }],
      email: ['', { nonNullable: true }],
      // company: ['', { nonNullable: true }],
      // position: ['', { nonNullable: true }],
      msg: ['', { nonNullable: true }],
    });
  }

  isInvalidForm(fieldname: string): boolean {
    return (
      this.contactusForm.controls[fieldname].invalid &&
      this.contactusForm.controls[fieldname].touched
    );
    //  (this.contactForm.controls[fieldname].dirty ||
    //  this.contactForm.controls[fieldname].touched)
  }

  sendMessage(contactusForm: FormGroup) {
    this.contactformService.sendFormMsg(contactusForm.value).subscribe(
      (Message) => {
        contactusForm.reset();
        this.showSwalSuccess();
      },
      (errorResponse: HttpErrorResponse) => {
        this.errorResponse = errorResponse;
      }
    );
  }

  private showSwalSuccess() {
    Swal.fire({
      icon: 'success',
      title: '送信されました',
      text: '確認次第折り返しご連絡させていただきます',
      customClass: {
        confirmButton: 'btn btn-primary btn-lg',
      },
      buttonsStyling: false,
      timer: 5000,
    }).then(() => {
      this.router.navigate(['/landing']);
    });
  }
}
