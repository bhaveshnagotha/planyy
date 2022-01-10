import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment'
import { BehaviorSubject,Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonApiService {

  private currentCustomerSubject: BehaviorSubject<any>;
  public currentCustomer: Observable<any>;

  constructor(public http: HttpClient,) { 
    let currentCustomerInfo =  localStorage.getItem('CurrentCustomerInfo');
    this.currentCustomerSubject = new BehaviorSubject<any>(currentCustomerInfo != null ? JSON.parse(currentCustomerInfo): null);               
    this.currentCustomer = this.currentCustomerSubject.asObservable();

  }
  public reloadList: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  postRequest(url:any, requestData:any) {
    return this.http.post<any>(environment.baseUrl + url, requestData)
  }

  getRequest(url:any) {
    return this.http.get<any>(environment.baseUrl + url)
  }

  putRequest(url:any, requestData = null) {
    return this.http.put(environment.baseUrl + url, requestData)
  }

  upsert(url:any, requestData:any, id = 0) {
    if (id == 0) {
      return this.http.post<any>(environment.baseUrl + url + "/Add", requestData)
    }
    else {
      return this.http.put(environment.baseUrl + url + "/Edit", requestData)
    }
  }

  GetPaginatedByJquery(url:any, requestData:any) {
    return this.http.post<any>(environment.baseUrl + url + "/GetPaginatedByJquery", requestData)
  }

  deleteRequest(url:any) {
    return this.http.delete(environment.baseUrl + url)
  }

  fileDownload(url:any) {
    return this.http.get<Blob>(environment.baseUrl + url , { responseType: 'blob' as 'json' });
  }


  getCurrentUserInfo() {
    return this.http.get<any>(environment.baseUrl + "customer/v1/get-customer-info").pipe(map(res => {                                
          localStorage.setItem('CurrentCustomerInfo', JSON.stringify(res.data));
          this.currentCustomerSubject.next(res.data);
          return res.data;
    }));     
  }

  

}
