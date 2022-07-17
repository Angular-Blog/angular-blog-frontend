import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../store/models/user.model';
import { loginUser } from 'src/app/store/actions/user-state.action';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  user$: Observable<User>
  title = 'angularblog';

  constructor(private store: Store<{user: User}>, private authService: AuthService, private router: Router) {
    this.user$ = store.select('user')
  }

  ngOnInit(): void {
    if(localStorage.getItem('currentUser') != '' && localStorage.getItem('currentUser') != null) {
      const loggedIn = this.checkLogin();
      console.log(loggedIn)

    }
  }

  public checkLogin(): any {
    let loggedIn = true;
      this.authService.checkIfValidToken().subscribe((data: any) => {
          console.log(data.username)
          this.store.dispatch(loginUser({username: data.username, userId: data.id}))
          loggedIn =  true
      })
      if(loggedIn) {
        this.router.navigate(['/home'])
      }
  }
}

