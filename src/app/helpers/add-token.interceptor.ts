import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {

  constructor(private router:Router,
              private snackBar: MatSnackBar) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

            const token = localStorage.getItem('token');

            if(token)
            {
              request = request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
            }

            return next.handle(request).pipe(
              catchError((error: HttpErrorResponse) => {
                if(error.status === 401){

                  this.snackBar.open('La sesión expiro', 'Error', {
                    duration: 3000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                  });

                  this.router.navigate(['/login']);
                }
                return throwError(error);
            })
            );
  }
}
