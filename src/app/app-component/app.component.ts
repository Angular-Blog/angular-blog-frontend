import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../store/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  user$: Observable<User>
  title = 'angularblog';

  constructor(private store: Store<{user: User}>) {
    this.user$ = store.select('user')
  }

  public checkLogin(): boolean {
    let loggedIn = false
    this.user$.subscribe((value: User) => {
      if(value.loggedIn) {
        loggedIn = true
      }
    })
    return loggedIn;
  }
}

