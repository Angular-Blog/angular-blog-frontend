import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-component',
  templateUrl: './post-component.component.html',
  styleUrls: ['./post-component.component.scss']
})
export class PostComponentComponent implements OnInit {
  @Input() post: any
  dateDisplay: string

  constructor() {
    this.dateDisplay = ""
  }

  ngOnInit(): void {
    console.log(this.post.createdAt)
    this.parseDate()
  }

  parseDate() {
    const postDateTime = new Date(this.post.createdAt.replace(" ", ":"))
    const nowDateTime = new Date()
    const secondDiff = (nowDateTime.getTime() - postDateTime.getTime()) / 1000
    console.log(postDateTime.getMonth())
    if (secondDiff > 86400) {
      this.dateDisplay = `${postDateTime.getMonth() + 1}-${postDateTime.getDate()}-${postDateTime.getFullYear()}`
      console.log(secondDiff)
    }
    else if (secondDiff > 3600) {
      this.dateDisplay = `${Math.floor(secondDiff / 3600)}h`
    }
    else if (secondDiff > 60) {
      this.dateDisplay = `${Math.floor(secondDiff / 60)}m`
    }
    else if (secondDiff > 10) {
      this.dateDisplay = `${Math.floor(secondDiff)}s`
    }
    else {
      this.dateDisplay = "just now"
    }
  }

}
