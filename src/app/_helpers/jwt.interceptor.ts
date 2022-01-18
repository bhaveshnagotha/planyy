import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { finalize } from 'rxjs/operators';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        // add authorization header with jwt token if available
        let currentUserValue = this.authenticationService.currentUserValue;               
        if (currentUserValue) {            
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer '+currentUserValue                    
                }
            });
        }
        return next.handle(request).pipe(finalize(() => {
        
        }));
    }
}