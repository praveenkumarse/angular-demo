import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    let info = localStorage.getItem('user-details');
    const authtoken = req.clone({
      headers: req.headers.set("Authorization", info)
    })
    return next.handle(authtoken);
  }


}
