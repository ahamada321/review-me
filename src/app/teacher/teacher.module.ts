import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from '../auth/shared/auth.guard';

import { TeacherComponent } from '../teacher/teacher.component';
import { TeacherChangePasswordComponent } from './teacher-change-password/teacher-change-password.component';
import { TeacherEditComponent } from './teacher-edit/teacher-edit.component';
import { TeacherMypageComponent } from './teacher-mypage/teacher-mypage.component';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { TeacherNotificationComponent } from './teacher-notification/teacher-notification.component';
import { ImageUploadModule } from '../shared/image-upload/image-upload.module';

const routes: Routes = [
  {
    path: 'teacher',
    component: TeacherComponent,
    children: [
      {
        path: '',
        component: TeacherMypageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'edit',
        component: TeacherEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'password',
        component: TeacherChangePasswordComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'notification',
        component: TeacherNotificationComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [
    TeacherComponent,
    TeacherChangePasswordComponent,
    TeacherEditComponent,
    TeacherMypageComponent,
    TeacherNotificationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    JwBootstrapSwitchNg2Module,
    ImageUploadModule,
  ],
  exports: [],
  providers: [],
})
export class TeacherModule {}
