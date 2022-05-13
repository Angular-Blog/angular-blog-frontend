import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs';

@Injectable()
export class AuthService {
     
    constructor(private http: HttpClient) {
    }
      
    login(email:string, password:string ) {
        return this.http.post('/api/auth/login', {email, password}).pipe(
          shareReplay()
        )
    }

    logout() {
      localStorage.setItem("currentUser", '')
    }
}
