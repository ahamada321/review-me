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
import { PostsCreateComponent } from "./posts-create/posts-create.component";
import { PostsDetailComponent } from "./posts-detail/posts-detail.component";
import { PostsEditComponent } from "./posts-edit/posts-edit.component";
import { PostsListsComponent } from "./posts-lists/posts-lists.component";
import { PostsComponent } from "./posts.component";

const routes: Routes = [
  {
    path: "posts",
    component: PostsComponent,
    children: [
      // {
      //   path: "",
      //   component: StudentMypageComponent,
      //   canActivate: [AuthGuard],
      // },
      {
        path: "create",
        component: PostsCreateComponent,
        // canActivate: [AuthGuard],
      },
      {
        path: "detail",
        component: PostsDetailComponent,
        // canActivate: [AuthGuard],
      },
      {
        path: "edit",
        component: PostsEditComponent,
        // canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [
    PostsComponent,
    PostsCreateComponent,
    PostsDetailComponent,
    PostsEditComponent,
    PostsListsComponent,
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
export class PostsModule {}
