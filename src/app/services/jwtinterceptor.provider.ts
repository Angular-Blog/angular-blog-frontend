import { HttpInterceptor,  HttpRequest,  HttpHandler,  HttpEvent,  HTTP_INTERCEPTORS} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable() 

export class JwtInterceptor implements HttpInterceptor {  
    constructor() {}
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const localUser =  localStorage.getItem('currentUser')
        let currentUser = {token: ""};
        if (localUser != null && localUser != "") {
            currentUser = JSON.parse(localUser)
        }
        if (currentUser.token != "") {  
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });    
        }
        return next.handle(request);  
    }
}

export const jwtInterceptorProvider = { provide: HTTP_INTERCEPTORS,  useClass: JwtInterceptor,  multi: true};