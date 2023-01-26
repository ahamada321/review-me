import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangeEmailComponent } from './change-email.component';

@NgModule({
  declarations: [ChangeEmailComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [ChangeEmailComponent],
  providers: [],
})
export class ChangeEmailModule {}
