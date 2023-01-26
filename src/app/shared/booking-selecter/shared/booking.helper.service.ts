import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Booking } from './booking.model';

@Injectable()
export class BookingHelperService {
  private getRangeOfDates(start: any, end: any, dateFormat: any) {
    const tempDates = [];
    const mEnd = moment(end);
    let mStart = moment(start);

    while (mStart < mEnd) {
      tempDates.push(mStart.format(dateFormat));
      mStart = mStart.add(1, 'day');
    }
    tempDates.push(moment(start).format(dateFormat));
    tempDates.push(mEnd.format(dateFormat));

    return tempDates;
  }

  private formatDate(date: any, dateFormat: any) {
    return moment(date).format(dateFormat);
  }

  public formatBookingDate(date: any) {
    return this.formatDate(date, Booking.DATE_FORMAT);
  }

  public getBookingRangeOfDates(start: any, end: any) {
    return this.getRangeOfDates(start, end, Booking.DATE_FORMAT);
  }
}
