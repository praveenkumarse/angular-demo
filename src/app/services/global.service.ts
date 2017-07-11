import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GlobalService {

  constructor(public http: Http) { }

  public getRequest(url): Observable<any> {
    return this.http.get(url)
      .map(res => {
        return res.json();
      })
  }

  public postRequest(url, data): Observable<any> {
    return this.http.post(url, data)
      .map(res => {
        return res.json();
      })
  }

  public putRequest(url, data): Observable<any> {
    return this.http.put(url, data)
      .map(res => {
        return res.json();
      })
  }

  public deleteRequest(url, options?): Observable<any> {
    return this.http.delete(url, options)
      .map(res => {
        return res.json();
      })
  }
}