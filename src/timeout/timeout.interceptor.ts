import { Injectable, NestInterceptor, ExecutionContext, CallHandler,RequestTimeoutException } from '@nestjs/common';
import { Observable, TimeoutError, throwError } from 'rxjs';
import { catchError, take, timeout, } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(3000),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException());
        }
        return throwError(() => err);
      })
    );
  }
}
