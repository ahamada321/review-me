import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SubscriptionFormService {
  constructor(private http: HttpClient) {}

  public subscribe(formData: any): Observable<any> {
    return this.http.get(
      'https://assets.mailerlite.com/jsonp/258165/forms/79438285814892063/subscribe',
      { params: formData }
    );
  }
}
