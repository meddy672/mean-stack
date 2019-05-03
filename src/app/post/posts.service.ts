import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';

// Make the  Service Accessable to of ts files.
@Injectable({ providedIn: 'root' })
export class PostService {

  private posts: Post[] = [];

  // Each new post added by user are stored as a subject in an array.
  private postsUpdated = new Subject<Post[]>();

  constructor(private httpClient: HttpClient) { }

  /**
   * @getPost
   * return post from the server
   */
  getPosts() {
    this.httpClient.get<{ message: string, posts: Post[] }>('http://localhost:3000/api/post')
      .subscribe((postData) => {
        this.posts = postData.posts;

        // Pass a copy of the post to DOM
        this.postsUpdated.next([...this.posts]);
      });
  }

  getUpdatedPostListener() {

    return this.postsUpdated.asObservable();
  }

  addPosts(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
