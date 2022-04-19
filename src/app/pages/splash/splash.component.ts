import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/store/models/user.model';
import { loginUser, logoutUser } from 'src/app/store/actions/user-state.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {
  user$: Observable<User>
  loggedIn: boolean
  
  constructor(
    private store: Store<{user: User}>,
    private router: Router
    ) {
    this.user$ = store.select('user')
    this.loggedIn = false
  }

  login() {
    this.store.dispatch(loginUser())
    this.router.navigate(['/home'])
  }

  logout() {
    this.store.dispatch(logoutUser())
  }

  ngOnInit(): void {
    this.user$.subscribe((value: User) => {
      if(value.loggedIn) {
        this.loggedIn = true
      }
    })
  }

}
