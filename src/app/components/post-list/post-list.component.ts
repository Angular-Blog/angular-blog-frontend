import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  @Input() posts: any
  sortedPostList: any

  constructor() {
    this.sortedPostList = []
  }

  ngOnInit(): void {
    console.log(this.posts)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['posts'].currentValue) {
      this.sortedPostList = this.posts.sort(function(a: any, b: any){
        const timestamp1 = new Date(a.createdAt).getTime()
        const timestamp2 = new Date(b.createdAt).getTime()
        return timestamp2 - timestamp1;
      })
      console.log(this.sortedPostList)
    }
}

}
