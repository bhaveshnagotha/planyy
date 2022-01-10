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
        let token =  localStorage.getItem('CurrentUser');
        this.currentUserSubject = new BehaviorSubject<any>(token != null ? JSON.parse(token): null);               
        this.currentUser = this.currentUserSubject.asObservable();
        
    }

    public get currentUserValue() {
        // console.log("get constructor") 
        // console.log(this.currentUserSubject.value.token);
        return this.currentUserSubject.value;
    }

    getPersonName() {
        return this.currentUserValue["data"]["person_Name"];
    }
    getRoleName(){
        return this.currentUserValue["data"]["role"];
    }
    signup(requestData:any) {
            return this.http.post<any>(environment.baseUrl +"customer/v1/register-customer", requestData)
            .pipe(map(user => {                
                return user;
        }));    
    }
    login(requestData:any) {        
            return this.http.post<any>(environment.baseUrl +"auth-updated/token ", requestData)
            .pipe(map(user => {                
                console.log("calling user");
                localStorage.setItem('CurrentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
        }));    
    }

    
    // login(requestData) {
    //     return this.http.post<any>(environment.baseUrl + "user/signIn", requestData)
    //         .pipe(map(user => {
    //             localStorage.setItem('CurrentUser' + moment().format("DDYYYYMM"), JSON.stringify(user));
    //             this.currentUserSubject.next(user);
    //             return user;
    //         }));
    // }

    logout() {
        localStorage.removeItem('CurrentUser' + moment().format("DDYYYYMM"));
        localStorage.removeItem('CurrentUserLayoutSettings');
        this.currentUserSubject.next(null);
        document.body.className = '';
        this.router.navigate(['login']);
 
    }
}