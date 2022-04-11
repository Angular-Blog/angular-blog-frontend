import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { User } from 'src/app/store/models/user.model';
import { loginUser, logoutUser } from 'src/app/store/actions/user-state.action';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  
  user$: Observable<User>
  loggedIn: boolean

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<{user: User}>
    ) 
    {
      this.user$ = store.select('user')
      this.loggedIn = false
    }

    login() {
      console.log(this.user$)
      this.store.dispatch(loginUser())
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
