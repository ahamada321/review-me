import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { StaticModule } from './statics/statics.module';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    StaticModule,
    AuthModule,
    StudentModule,
    TeacherModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
