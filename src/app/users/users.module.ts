import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AuthGuard } from "../auth/shared/auth.guard";

import { MatStepperModule } from "@angular/material/stepper";
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from "@danielmoncada/angular-datetime-picker";
import { BookingSelecterModule } from "../shared/booking-selecter/booking-selecter.module";
import { JwBootstrapSwitchNg2Module } from "jw-bootstrap-switch-ng2";
import { ImageUploadModule } from "../shared/image-upload/image-upload.module";
import { ChangePasswordModule } from "../shared/change-password/change-password.module";
import { ChangeEmailModule } from "../shared/change-email/change-email.module";
import { UsersMypageComponent } from "./users-mypage/users-mypage.component";
import { UsersRevenuesComponent } from "./users-revenues/users-revenues.component";
import { UsersSettingsComponent } from "./users-settings/users-settings.component";
import { UsersSubscriptionsComponent } from "./users-subscriptions/users-subscriptions.component";

const routes: Routes = [
  {
    path: "users",
    // component: StudentComponent,
    children: [
      {
        path: "",
        // component: StudentMypageComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [
    UsersMypageComponent,
    UsersRevenuesComponent,
    UsersSettingsComponent,
    UsersSubscriptionsComponent,
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
    ChangeEmailModule,
  ],
  exports: [],
  providers: [],
})
export class UsersModule {}
