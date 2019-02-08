import { AuthService } from './../services';
import { Observable } from 'rxjs';

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private readonly authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authService.currentUserValue;

    if (currentUser && currentUser.refreshToken) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.refreshToken}`
        }
      });
    }

    return next.handle(req);
  }
}
