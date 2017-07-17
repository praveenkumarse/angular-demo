import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class GlobalService {

  constructor(public http: Http) { }
  public authorization(headers: Headers) {
    let info = localStorage.getItem('user-details');
    headers.append('Authorization', info);
  }
  public getRequest(url): Observable<any> {
    let headers = new Headers();
    this.authorization(headers)
    return this.http.get(url, {
      headers: headers
    }).map(res => {
      return res.json();
    }).catch((error: Observable<any>) => {
      return Observable.throw("Somthing in wrong");
    })
  }

  public postRequest(url, data,status?): Observable<any> {
    let headers = new Headers();
    if(status !='login')
    this.authorization(headers);
    return this.http.post(url, data, {
      headers: headers
    }).map(res => {
      return res.json();
    }).catch((error: Observable<any>) => {
      return Observable.throw("Somthing in wrong");
    })
  }

  public putRequest(url, data?): Observable<any> {
    let headers = new Headers();
    this.authorization(headers);
    return this.http.put(url, data, {
      headers: headers
    }).map(res => {
      return res.json();
    }).catch((error: Observable<any>) => {
      return Observable.throw("Somthing in wrong");
    })
  }

  public deleteRequest(url): Observable<any> {
    let headers = new Headers();
    this.authorization(headers);
    return this.http.delete(url, {
      headers: headers
    }).map(res => {
      return res.json();
    }).catch((error: Observable<any>) => {
      return Observable.throw("Somthing in wrong");
    })
  }
}