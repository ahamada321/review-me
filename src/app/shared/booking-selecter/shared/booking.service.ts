import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Booking } from "./booking.model";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class BookingService {
  constructor(private http: HttpClient) {}

  // public getUserBookings(): Observable<any> {
  //   return this.http.get('/api/v1/bookings');
  // }
  public getBookingById(bookingId: any): Observable<any> {
    return this.http.get("/api/v1/bookings/" + bookingId);
  }

  public countUserBookings(userId: any, addMonth?: number): Observable<any> {
    if (!addMonth) {
      addMonth = 0;
    }
    return this.http.get(
      `/api/v1/bookings/count/user?userId=${userId}&addMonth=${addMonth}`
    );
  }

  public getUserBookings(userId: any): Observable<any> {
    return this.http.get("/api/v1/bookings/user/" + userId);
  }

  public getUserDateBlockBookings(userId: any): Observable<any> {
    return this.http.get("/api/v1/bookings/block/user/" + userId);
  }

  public getUserPendingBookings(): Observable<any> {
    return this.http.get("/api/v1/bookings/pending");
  }

  public getUserExpiredBookings(): Observable<any> {
    return this.http.get("/api/v1/bookings/expired");
  }

  public getUpcomingBookings(userId?: any): Observable<any> {
    return this.http.get("/api/v1/bookings/upcoming/" + userId);
  }
  public getUpcomingThismonthBookings(userId?: any): Observable<any> {
    return this.http.get("/api/v1/bookings/upcomingthismonth/" + userId);
  }

  public getFinishedBookings(userId?: any): Observable<any> {
    return this.http.get("/api/v1/bookings/finished/" + userId);
  }

  public createBooking(bookingData: any): Observable<any> {
    return this.http.post("/api/v1/bookings", bookingData);
  }

  public updateBooking(bookingData: any): Observable<any> {
    return this.http.patch("/api/v1/bookings", bookingData);
  }

  public deleteBooking(bookingId: string): Observable<any> {
    return this.http.delete("/api/v1/bookings/" + bookingId);
  }

  public createDateBlockBooking(bookingData: any): Observable<any> {
    return this.http.post("/api/v1/bookings/block", bookingData);
  }
}
