import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { MyOriginAuthService } from './auth.service';
import { Observable } from 'rxjs'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(public auth: MyOriginAuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.auth.getAuthToken()

        if(token) {
            req = req.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + token
                }
            })
        }
        return next.handle(req)
    }
}
