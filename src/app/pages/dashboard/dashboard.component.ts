import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/store/models/user.model';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user$: Observable<User>

  constructor(private store: Store<{user: User}>) {
    this.user$ = store.select('user')
  }

  ngOnInit(): void {
  }

}
