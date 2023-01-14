import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Booking } from './booking.model';

@Injectable()
export class BookingHelperService {
  private getRangeOfDates(startAt: any, endAt: any, dateFormat: any) {
    const tempDates = [];
    const mEndAt = moment(endAt);
    let mStartAt = moment(startAt);

    while (mStartAt < mEndAt) {
      tempDates.push(mStartAt.format(dateFormat));
      mStartAt = mStartAt.add(1, 'day');
    }
    tempDates.push(moment(startAt).format(dateFormat));
    tempDates.push(mEndAt.format(dateFormat));

    return tempDates;
  }

  private formatDate(date: any, dateFormat: any) {
    return moment(date).format(dateFormat);
  }

  public formatBookingDate(date: any) {
    return this.formatDate(date, Booking.DATE_FORMAT);
  }

  public getBookingRangeOfDates(startAt: any, endAt: any) {
    return this.getRangeOfDates(startAt, endAt, Booking.DATE_FORMAT);
  }
}
