import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubscriptionFormComponent } from './subscription-form.component';
import { SubscriptionFormService } from './shared/subscription-form.service';

@NgModule({
  declarations: [SubscriptionFormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [SubscriptionFormComponent],
  providers: [SubscriptionFormService],
})
export class SubscriptionFormModule {}
