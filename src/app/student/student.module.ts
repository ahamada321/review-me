import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from '../auth/shared/auth.guard';

import { StudentComponent } from './student.component';
import { StudentBookingComponent } from './student-booking/student-booking.component';
import { StudentChangePasswordComponent } from './student-change-password/student-change-password.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentMypageComponent } from './student-mypage/student-mypage.component';
import { MatStepperModule } from '@angular/material/stepper';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';
import { BookingSelecterModule } from '../shared/booking-selecter/booking-selecter.module';

const routes: Routes = [
  {
    path: 'student',
    component: StudentComponent,
    children: [
      {
        path: '',
        component: StudentMypageComponent,
        // canActivate: [AuthGuard],
      },
      {
        path: 'edit',
        component: StudentEditComponent,
        // canActivate: [AuthGuard],
      },
      {
        path: 'booking',
        component: StudentBookingComponent,
        // canActivate: [AuthGuard],
      },

      {
        path: 'password',
        component: StudentChangePasswordComponent,
        // canActivate: [AuthGuard],
      },
      // {
      //   path: "report/create",
      //   component: TeacherReportCreateComponent,
      //   canActivate: [AuthGuard],
      // },
    ],
  },
];

@NgModule({
  declarations: [
    StudentComponent,
    StudentBookingComponent,
    StudentChangePasswordComponent,
    StudentEditComponent,
    StudentMypageComponent,
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
    BookingSelecterModule,
  ],
  exports: [],
  providers: [],
})
export class StudentModule {}
