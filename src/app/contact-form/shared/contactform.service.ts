import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactForm } from './contactform.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ContactFormService {
  constructor(private http: HttpClient) {}

  public sendFormMsg(formData: ContactForm): Observable<any> {
    return this.http.post('/api/v1/contactforms', formData);
  }
}
