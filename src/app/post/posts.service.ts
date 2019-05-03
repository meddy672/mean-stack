import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './post.model';

// Make the  Service Accessable to of ts files.
@Injectable({ providedIn: 'root' })
export class PostService {

  private posts: Post[] = [];

  // Each new post added by user are stored as a subject in an array.
  private postsUpdated = new Subject<Post[]>();

  getPosts() {
    return [...this.posts];
  }

  getUpdatedPostListener() {

    return this.postsUpdated.asObservable();
  }

  addPosts(title: string, content: string) {
    const post: Post = { title: title, content: content };
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
