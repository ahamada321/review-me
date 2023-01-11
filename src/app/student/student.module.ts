import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentComponent } from './student.component';
import { StudentChangePasswordComponent } from './student-change-password/student-change-password.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentMypageComponent } from './student-mypage/student-mypage.component';

const routes: Routes = [
  //   { path: 'maintenance', component: MaintenanceComponent },
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: '**', component: Page404Component }
];

@NgModule({
  declarations: [
    StudentComponent,
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
  ],
  exports: [],
  providers: [],
})
export class StudentModule {}