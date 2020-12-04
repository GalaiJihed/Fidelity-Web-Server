import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpClient } from '@angular/common/http';
import { Injectable, Injector, Inject, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NbAuthToken, NbAuthService } from '@nebular/auth';

export const NB_AUTH_INTERCEPTOR_HEADER = new InjectionToken<string>('Nebular Simple Interceptor Header');

@Injectable()
export class HttpClientInterception implements HttpInterceptor {
    constructor(private injector: Injector) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('intercetption ');
        console.log(this.authService.request);
        const modified = req.clone({ setHeaders: { 'Custom-Header-2': '2' } });
        return next.handle(modified);
    }
    protected get authService(): HttpClient {
        return this.injector.get(HttpClient);
    }
}

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private injector: Injector,
        @Inject(NB_AUTH_INTERCEPTOR_HEADER) protected filter) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // do not intercept request whose urls are filtered by the injected filter
        console.log('dwdwd');
        if (!this.filter(req)) {
            return this.authService.isAuthenticatedOrRefresh()
                .pipe(
                    switchMap(authenticated => {
                        if (authenticated) {
                            return this.authService.getToken().pipe(
                                switchMap((token: NbAuthToken) => {
                                    const JWT =token.getValue();
                                    req = req.clone({
                                        setHeaders: {
                                            auth: JWT,
                                        },
                                    });
                                    return next.handle(req);
                                }),
                            )
                        } else {
                            // Request is sent to server without authentication so that the client code
                            // receives the 401/403 error and can act as desired ('session expired', redirect to login, aso)
                            return next.handle(req);
                        }
                    }),
                )
        } else {
            
            return next.handle(req);
        }
    }

    protected get authService(): NbAuthService {
        return this.injector.get(NbAuthService);
    }

}