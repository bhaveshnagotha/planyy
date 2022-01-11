import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService, CommonService } from 'src/app/_services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService,
        private commonService: CommonService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {           
        
            if (err.status === 0) {
                this.commonService.toastMSG(this.commonService.toastType.error, "Response Not Found .");
            }
            else if (err.status === 401) {
                this.commonService.toastMSG(this.commonService.toastType.error, err["error"]["message"]);
                //this.authenticationService.logout();
            }else{
                if (err["error"]["message"] != "") {
                    this.commonService.toastMSG(this.commonService.toastType.error, err["error"]["message"]);
                }
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}
