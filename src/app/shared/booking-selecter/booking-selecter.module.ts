import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingSelecterComponent } from './booking-selecter.component';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookingService } from './shared/booking.service';

@NgModule({
  declarations: [BookingSelecterComponent],
  imports: [
    CommonModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [BookingSelecterComponent],
  providers: [BookingService],
})
export class BookingSelecterModule {}
