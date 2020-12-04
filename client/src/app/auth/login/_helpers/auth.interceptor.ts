import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { TokenStorageService } from '../_services/token-storage.service';
import { AuthService } from '../_services/auth.service';

const TOKEN_HEADER_KEY = 'auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    const token = this.token.getAuthData().token;
    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY,token) });
    }
    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
