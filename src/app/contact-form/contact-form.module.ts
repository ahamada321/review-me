import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ContactFormService } from './shared/contactform.service';
import { ContactFormComponent } from './contact-form.component';
import { ContactFormContactusComponent } from './contact-form-contactus/contact-form-contactus.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { ContactFormSupportComponent } from './contact-form-support/contact-form-support.component';

const routes: Routes = [
  // {
  // path: "form",
  // component: ContactFormComponent,
  // children: [
  { path: 'contactus', component: ContactFormContactusComponent },
  { path: 'support', component: ContactFormSupportComponent },
  // ],
  // },
];

@NgModule({
  declarations: [
    ContactFormComponent,
    ContactFormContactusComponent,
    ContactFormSupportComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgbModule,
    JwBootstrapSwitchNg2Module,
  ],
  providers: [ContactFormService],
})
export class ContactFormModule {}
