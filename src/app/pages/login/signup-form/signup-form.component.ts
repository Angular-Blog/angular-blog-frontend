import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Store } from '@ngrx/store';
import { User } from 'src/app/store/models/user.model';
import { Observable } from 'rxjs';
import { loginUser } from 'src/app/store/actions/user-state.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {
  form: FormGroup;
  flag: boolean = true;
  flag2: boolean = true;
  user$: Observable<User>;

  constructor(private fb: FormBuilder, private authService: AuthService, private store: Store<{user: User}>, private router: Router) {
    this.form = this.fb.group({
      username: [null, [Validators.required, Validators.minLength(6)]],
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: [null, [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')]],
      confirmpassword: [null, [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')]]
    });
    this.user$ = store.select('user');
  }

  ngOnInit(): void {

  }

  saveDetails(form: any) {
    if(form.value.password === form.value.confirmpassword) {
      this.authService.signUp(form.value.username, form.value.password, form.value.email).subscribe(data => {
        const result = data as any
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
    else {
      alert("Password and Confirm Password fields must match!")
    }
  }
}
