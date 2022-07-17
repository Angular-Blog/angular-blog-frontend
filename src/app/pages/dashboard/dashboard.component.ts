import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/store/models/user.model';
import { Store } from '@ngrx/store';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user$: Observable<User>
  user: User
  posts: any

  constructor(private store: Store<{user: User}>, private postService: PostService) {
    this.user$ = store.select('user'),
    this.user = {
      username: "",
      userId: "",
      loggedIn: true
    }
  }

  ngOnInit(): void {
    this.user$.subscribe((value: User) => {
      this.user = value
      this.getUserPosts()
    })
  }

  getUserPosts() {
    this.postService.getUserPosts(this.user.userId).subscribe(data => {
      console.log()
      this.posts = data
    })
  }

}
