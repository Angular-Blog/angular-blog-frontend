import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';

@Injectable()
export class PostService {

    constructor(private http: HttpClient) {
    }

    getUserPosts(id: string): Observable<any> {
        return this.http.get(`/api/posts/user/${id}`).pipe(
            shareReplay()
          )
    }
}