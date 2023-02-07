import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SubscriptionFormService } from './shared/subscription-form.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.scss'],
})
export class SubscriptionFormComponent implements OnInit {
  email!: string;

  constructor(private subscriptionFormService: SubscriptionFormService) {}

  ngOnInit() {}

  subscribe(mailingForm: any) {
    this.subscriptionFormService
      .subscribe({
        'fields[email]': mailingForm.value.email,
      })
      .subscribe(
        (result) => {
          if (result.success === true) {
            this.showSwalSuccess();
            mailingForm.reset();
          } else {
            this.showSwalError();
            console.error(result);
            mailingForm.reset();
          }
        },
        (errorResponse: HttpErrorResponse) => {
          console.error(errorResponse);
        }
      );
  }

  showSwalSuccess() {
    Swal.fire({
      icon: 'success',
      title: 'Thank you for registering',
      text: 'We are now add you to the waiting list',
      customClass: {
        confirmButton: 'btn btn-primary btn-lg',
      },
      buttonsStyling: false,
    });
  }

  showSwalError() {
    Swal.fire({
      icon: 'error',
      title: 'Something wrong',
      text: 'Please try again',
      customClass: {
        confirmButton: 'btn btn-primary btn-lg',
      },
      buttonsStyling: false,
    });
  }
}
