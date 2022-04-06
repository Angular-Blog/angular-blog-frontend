import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/store/models/user.model';
import { loginUser, logoutUser } from 'src/app/store/actions/user-state.action';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit {
  user$: Observable<User>
  loggedIn: boolean
  
  constructor(private store: Store<{user: User}>) {
    this.user$ = store.select('user')
    this.loggedIn = false
    this.user$.subscribe((value: User) => {
      if(value.loggedIn) {
        this.loggedIn = true
      }
    })
  }

  login() {
    this.store.dispatch(loginUser())
  }

  logout() {
    this.store.dispatch(logoutUser())
  }

  ngOnInit(): void {
  }

}
