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
import { AdminComponent } from "./admin.component";
import { AdminPendingListComponent } from "./admin-pending-list/admin-pending-list.component";
import { AdminPendingDetailComponent } from "./admin-pending-detail/admin-pending-detail.component";

const routes: Routes = [
  {
    path: "admin",
    component: AdminComponent,
    children: [
      {
        path: "",
        component: AdminPendingListComponent,
        // canActivate: [AuthGuard],
      },
      {
        path: "pending/:postId",
        component: AdminPendingDetailComponent,
        // canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [
    AdminComponent,
    AdminPendingListComponent,
    AdminPendingDetailComponent,
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
export class AdminModule {}
