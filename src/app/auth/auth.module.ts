import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { LoginResetpasswordComponent } from './login/login-resetpassword/login-resetpassword.component';
import { LoginResetpasswordSentComponent } from './login/login-resetpassword/login-resetpassword-sent/login-resetpassword-sent.component';
// import { LoginNewPasswordComponent } from './login-popup/login-newpassword/login-newpassword.component';
import { RegisterComponent } from './register/register.component';
import { RegisterVerificationComponent } from './register/register-verification/register-verification.component';
import { RegisterSentComponent } from './register/register-sent/register-sent.component';
// import { environment } from "src/environments/environment";

import { MyOriginAuthService } from './shared/auth.service';
import { AuthGuard } from './shared/auth.guard';
import { TokenInterceptor } from './shared/token.interceptor';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
// import { TermsTextModule } from "../static/terms/helpers/terms-text/terms-text.module";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'login/reset', component: LoginResetpasswordComponent },
  { path: 'login/reset/sent', component: LoginResetpasswordSentComponent },
  // {
  //   path: 'login/reset/newpassword/:verifyToken',
  //   component: LoginNewPasswordComponent,
  // },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'register/sent', component: RegisterSentComponent },
  { path: 'register/:verifyToken', component: RegisterVerificationComponent },
];

@NgModule({
  declarations: [
    LoginComponent,
    LoginResetpasswordComponent,
    LoginResetpasswordSentComponent,
    // LoginNewPasswordComponent,
    RegisterComponent,
    RegisterSentComponent,
    RegisterVerificationComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    JwBootstrapSwitchNg2Module,
    // TermsTextModule,
  ],
  exports: [RouterModule],
  providers: [
    MyOriginAuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
})
export class AuthModule {}
