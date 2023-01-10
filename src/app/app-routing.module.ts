import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { StaticModule } from './statics/statics.module';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes), StaticModule, AuthModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
