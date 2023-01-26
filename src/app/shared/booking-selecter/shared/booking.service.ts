import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from './booking.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BookingService {
  constructor(private http: HttpClient) {}

  // public getUserBookings(): Observable<any> {
  //   return this.http.get('/api/v1/bookings');
  // }
  public getBookingById(bookingId: any): Observable<any> {
    return this.http.get('/api/v1/bookings/' + bookingId);
  }

  public countUserBookings(userId: any): Observable<any> {
    return this.http.get('/api/v1/bookings/count/user/' + userId);
  }

  public getUserBookings(userId: any): Observable<any> {
    return this.http.get('/api/v1/bookings/user/' + userId);
  }

  public getUserDateBlockBookings(userId: any): Observable<any> {
    return this.http.get('/api/v1/bookings/block/user/' + userId);
  }

  public getUserPendingBookings(): Observable<any> {
    return this.http.get('/api/v1/bookings/pending');
  }

  public getUserExpiredBookings(): Observable<any> {
    return this.http.get('/api/v1/bookings/expired');
  }

  public getUpcomingBookings(): Observable<any> {
    return this.http.get('/api/v1/bookings/upcoming');
  }

  public getFinishedBookings(): Observable<any> {
    return this.http.get('/api/v1/bookings/finished');
  }

  public createBooking(bookingData: any): Observable<any> {
    return this.http.post('/api/v1/bookings', bookingData);
  }

  public updateBooking(bookingData: any): Observable<any> {
    return this.http.patch('/api/v1/bookings', bookingData);
  }

  public deleteBooking(bookingId: string): Observable<any> {
    return this.http.delete('/api/v1/bookings/' + bookingId);
  }

  public createDateBlockBooking(bookingData: any): Observable<any> {
    return this.http.post('/api/v1/bookings/block', bookingData);
  }
}
