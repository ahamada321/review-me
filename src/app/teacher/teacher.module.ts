import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AuthGuard } from "../auth/shared/auth.guard";
import { JwBootstrapSwitchNg2Module } from "jw-bootstrap-switch-ng2";
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from "@danielmoncada/angular-datetime-picker";
import { AdsenseModule } from "ng2-adsense";
import { ImageUploadModule } from "../shared/image-upload/image-upload.module";
import { SearchbarModule } from "../shared/searchbar/searchbar.module";
import { FullCalendarModule } from "@fullcalendar/angular";
import { ChangePasswordModule } from "../shared/change-password/change-password.module";

import { TeacherComponent } from "../teacher/teacher.component";
import { TeacherMypageComponent } from "./teacher-mypage/teacher-mypage.component";
import { TeacherNotificationComponent } from "./teacher-notification/teacher-notification.component";
import { TeacherSearchComponent } from "./teacher-search/teacher-search.component";
import { TeacherEditStudentComponent } from "./teacher-edit-student/teacher-edit-student.component";
import { TeacherOfficehoursComponent } from "./teacher-officehours/teacher-officehours.component";
import { TeacherEditComponent } from "./teacher-edit/teacher-edit.component";
import { TeacherChangePasswordComponent } from "./teacher-change-password/teacher-change-password.component";
import { UserService } from "../shared/services/user.service";
import { TeacherBlockComponent } from "./teacher-block/teacher-block.component";
import { TeacherManageBlocksComponent } from "./teacher-manage-blocks/teacher-manage-blocks.component";
import { TeacherStudentBookingsComponent } from "./teacher-student-bookings/teacher-student-bookings.component";
import { TeacherStudentBookingMemoComponent } from "./teacher-student-booking-memo/teacher-student-booking-memo.component";

// source　https://www.npmjs.com/package/ng2-adsense

const routes: Routes = [
  {
    path: "teacher",
    component: TeacherComponent,
    children: [
      {
        path: "",
        component: TeacherMypageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "student-bookings/:studentId",
        component: TeacherStudentBookingsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "student-bookings/edit-memo/:bookingId",
        component: TeacherStudentBookingMemoComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "block",
        component: TeacherBlockComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "manage-block",
        component: TeacherManageBlocksComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "notification",
        component: TeacherNotificationComponent,
        canActivate: [AuthGuard],
      },

      {
        path: "search",
        component: TeacherSearchComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "edit-student/:studentId",
        component: TeacherEditStudentComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "officehours",
        component: TeacherOfficehoursComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "edit",
        component: TeacherEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "password",
        component: TeacherChangePasswordComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [
    TeacherComponent,
    TeacherMypageComponent,
    TeacherStudentBookingsComponent,
    TeacherStudentBookingMemoComponent,
    TeacherBlockComponent,
    TeacherManageBlocksComponent,
    TeacherNotificationComponent,
    TeacherSearchComponent,
    TeacherEditStudentComponent,
    TeacherOfficehoursComponent,
    TeacherEditComponent,
    TeacherChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    JwBootstrapSwitchNg2Module,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    AdsenseModule,
    ImageUploadModule,
    SearchbarModule,
    FullCalendarModule,
    ChangePasswordModule,
  ],
  exports: [],
  providers: [UserService],
})
export class TeacherModule {}
