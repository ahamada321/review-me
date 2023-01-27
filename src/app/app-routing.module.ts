import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { ContactFormModule } from './contact-form/contact-form.module';
import { StaticModule } from './statics/statics.module';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';

const routes: Routes = [];

@NgModule({
  imports: [
    // RouterModule.forRoot(routes),
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
    StaticModule,
    AuthModule,
    ContactFormModule,
    StudentModule,
    TeacherModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
