import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SubscriptionFormService {
  constructor(private http: HttpClient) {}

  public subscribe(formData: any): Observable<any> {
    return this.http.get(
      'https://assets.mailerlite.com/jsonp/258165/forms/74517805478708820/subscribe',
      { params: formData }
    );
  }
}
