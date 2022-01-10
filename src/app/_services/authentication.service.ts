import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';
import * as moment from 'moment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;


    // public currentUserProfile: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    


    constructor(private http: HttpClient, private router: Router) {
        this.currentUserSubject = new BehaviorSubject<any>(localStorage.getItem('HRCurrentUser' + moment().format("DDYYYYMM")));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue() {
        return this.currentUserSubject.value;
    }

    getPersonName() {
        return this.currentUserValue["data"]["person_Name"];
    }
    getRoleName(){
        return this.currentUserValue["data"]["role"];
    }
// https://api.planyy.com:8067/v1/register-customer
    signup(requestData:any) {
            return this.http.post<any>("https://api.planyy.com:8067/customer/v1/register-customer", requestData)
            .pipe(map(user => {                
                return user;
        }));    
    }

    login(requestData:any) {
            return this.http.post<any>("https://api.planyy.com:8067/auth-updated/token ", requestData)
            .pipe(map(user => {
                localStorage.setItem('HRCurrentUser' + moment().format("DDYYYYMM"), JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
        }));    
    }

    
    // login(requestData) {
    //     return this.http.post<any>(environment.baseUrl + "user/signIn", requestData)
    //         .pipe(map(user => {
    //             localStorage.setItem('HRCurrentUser' + moment().format("DDYYYYMM"), JSON.stringify(user));
    //             this.currentUserSubject.next(user);
    //             return user;
    //         }));
    // }

    logout() {
        localStorage.removeItem('HRCurrentUser' + moment().format("DDYYYYMM"));
        localStorage.removeItem('HRCurrentUserLayoutSettings');
        this.currentUserSubject.next(null);
        document.body.className = '';
        this.router.navigate(['login']);
 
    }
}