import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { User } from 'src/app/store/models/user.model';
import { logoutUser } from 'src/app/store/actions/user-state.action';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { loginUser } from 'src/app/store/actions/user-state.action';

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
    private store: Store<{user: User}>,
    private router: Router,
    private authService: AuthService,
    ) 
    {
      this.user$ = store.select('user')
      this.loggedIn = false
    }

    login() {
      this.router.navigate(['/login'])
    }
  
    logout() {
      this.store.dispatch(logoutUser())
    }

    ngOnInit(): void {
      this.user$.subscribe((value: User) => {
        if(value.loggedIn) {
          this.loggedIn = true
        }
        else {
          if(localStorage.getItem('currentUser') != '' && localStorage.getItem('currentUser') != null){
            try {
              this.authService.checkIfValidToken().subscribe((data: any) => {
                  console.log(data.username)
                  this.store.dispatch(loginUser({username: data.username, userId: data.id}))
                  this.loggedIn = true
              })
            }
            catch (error) {
              this.loggedIn = false;
              this.router.navigate([''])
            }
          }
          else {
            this.loggedIn = false;
            this.router.navigate([''])
          }
        }
      })
    }

}
