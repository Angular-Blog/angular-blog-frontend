import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Store } from '@ngrx/store';
import { User } from 'src/app/store/models/user.model';
import { Observable } from 'rxjs';
import { loginUser } from 'src/app/store/actions/user-state.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  providers: [AuthService]
})
export class LoginFormComponent implements OnInit {
  form: FormGroup;
  flag: boolean = true;
  user$: Observable<User>

  constructor(private fb: FormBuilder, private authService: AuthService, private store: Store<{user: User}>, private router: Router) {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    },
    this.user$ = store.select('user'));
  }

  ngOnInit(): void {
    
  }

  saveDetails(form: any) {
    this.authService.login(form.value.email, form.value.password).subscribe(data => {
      const result = data as any
      console.log(data)
      if(result.username && result.token) {
        localStorage.setItem("currentUser", JSON.stringify(result))
        this.store.dispatch(loginUser({username: result.username, userId: result.userId}))
        this.router.navigate(['/home'])
      }
    },
    error => {
      this.form.setValue({email: "", password: ""})
    })
  }
}
