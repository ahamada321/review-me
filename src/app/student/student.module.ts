import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from '../auth/shared/auth.guard';

import { StudentComponent } from './student.component';
import { StudentBookingComponent } from './student-booking/student-booking.component';
import { StudentChangeBookingComponent } from './student-change-booking/student-change-booking.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentChangePasswordComponent } from './student-change-password/student-change-password.component';
import { StudentMypageComponent } from './student-mypage/student-mypage.component';
import { MatStepperModule } from '@angular/material/stepper';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';
import { BookingSelecterModule } from '../shared/booking-selecter/booking-selecter.module';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { StudentNotificationComponent } from './student-notification/student-notification.component';
import { ImageUploadModule } from '../shared/image-upload/image-upload.module';
import { ChangePasswordModule } from '../shared/change-password/change-password.module';

const routes: Routes = [
  {
    path: 'student',
    component: StudentComponent,
    children: [
      {
        path: '',
        component: StudentMypageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'booking',
        component: StudentBookingComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'booking/:bookingId',
        component: StudentChangeBookingComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'edit',
        component: StudentEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'password',
        component: StudentChangePasswordComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'notification',
        component: StudentNotificationComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [
    StudentComponent,
    StudentBookingComponent,
    StudentChangeBookingComponent,
    StudentEditComponent,
    StudentChangePasswordComponent,
    StudentMypageComponent,
    StudentNotificationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatStepperModule,
    JwBootstrapSwitchNg2Module,
    ImageUploadModule,
    BookingSelecterModule,
    ChangePasswordModule,
  ],
  exports: [],
  providers: [],
})
export class StudentModule {}
