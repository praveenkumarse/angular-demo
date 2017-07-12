import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class GlobalService {

  constructor(public http: Http) { }

  public getRequest(url): Observable<any> {
    return this.http.get(url)
      .map(res => {
        return res.json();
      })
      .catch((error: Observable<any>) => {
        return Observable.throw("Somthing in wrong");
      })
  }

  public postRequest(url, data): Observable<any> {
    return this.http.post(url, data)
      .map(res => {
        return res.json();
      })
      .catch((error: Observable<any>) => {
        return Observable.throw("Somthing in wrong");
      })
  }

  public putRequest(url, data?): Observable<any> {
    return this.http.put(url, data)
      .map(res => {
        return res.json();
      })
      .catch((error: Observable<any>) => {
        return Observable.throw("Somthing in wrong");
      })
  }

  public deleteRequest(url, options?): Observable<any> {
    return this.http.delete(url, options)
      .map(res => {
        return res.json();
      })
      .catch((error: Observable<any>) => {
        return Observable.throw("Somthing in wrong");
      })
  }
}