import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AuthGuard } from "../auth/shared/auth.guard";
import { NgChartsModule } from "ng2-charts";
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
import { PostCreateComponent } from "./post-create/post-create.component";
import { PostDetailComponent } from "./post-detail/post-detail.component";
import { PostEditComponent } from "./post-edit/post-edit.component";
import { PostListComponent } from "./post-list/post-list.component";
import { PostComponent } from "./post.component";
import { PostService } from "./shared/post.service";
import { PostResultComponent } from "./post-result/post-result.component";
import { PostReviewComponent } from "./post-review/post-review.component";
import { ReviewModule } from "../shared/review/review.module";

const routes: Routes = [
  {
    path: "post",
    component: PostComponent,
    children: [
      {
        path: "",
        component: PostListComponent,
        // canActivate: [AuthGuard],
      },
      {
        path: "create",
        component: PostCreateComponent,
        // canActivate: [AuthGuard],
      },
      {
        path: "detail/:postId",
        component: PostDetailComponent,
        // canActivate: [AuthGuard],
      },
      {
        path: "review/:postId",
        component: PostReviewComponent,
        // canActivate: [AuthGuard],
      },
      {
        path: "edit/:postId",
        component: PostEditComponent,
        // canActivate: [AuthGuard],
      },
      {
        path: "result/:postId",
        component: PostResultComponent,
        // canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [
    PostComponent,
    PostCreateComponent,
    PostDetailComponent,
    PostReviewComponent,
    PostEditComponent,
    PostListComponent,
    PostResultComponent,
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
    NgChartsModule,
    ReviewModule,
  ],
  exports: [],
  providers: [PostService],
})
export class PostModule {}
