import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {CORS_ERROR_CODE, SESSION_EXPIRY_MESSAGE, UNAUTHORIZED_ERROR_CODE} from 'src/app/core';
import {environment} from 'src/environments/environment';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';

        if ((error && error.status === CORS_ERROR_CODE) || error.status === UNAUTHORIZED_ERROR_CODE) {
          // An alert will be displayed only if it is an active window
          // https://developer.mozilla.org/en-US/docs/Web/API/Window/alert
          window.alert(SESSION_EXPIRY_MESSAGE);
          window.location.href = environment.serverUrl;
        } else if (error.error instanceof ErrorEvent) {
          errorMsg = `Client Error Code: ${error.status},  Message: ${error.message}`;
        } else {
          errorMsg = `Server Error Code: ${error.status},  Message: ${error.message}`;
        }

        return throwError(() => new Error(errorMsg));
      })
    );
  }
}
