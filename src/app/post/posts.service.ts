import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { post } from 'selenium-webdriver/http';

// Make the  Service Accessable to of ts files.
@Injectable({ providedIn: 'root' })
export class PostService {

  private posts: Post[] = [];

  // Each new post added by user are stored as a subject in an array.
  private postsUpdated = new Subject<Post[]>();

  // http Object to be used to make request to the server
  constructor(private httpClient: HttpClient) { }

  // A function to get post from the server
  getPosts() {
    this.httpClient.get<{ message: string, posts: any }>('http://localhost:3000/api/post')
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          };
        });
      }))
      .subscribe((mappedPostData) => {
        this.posts = mappedPostData;

        // Pass a copy of the post to DOM
        this.postsUpdated.next([...this.posts]);
      });
  }

  getUpdatedPostListener() {

    return this.postsUpdated.asObservable();
  }


  /**
   *
   * @param title
   * @param content
   * A function to add post to the server
   */
  addPosts(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    this.httpClient.post<{ message: string, postId: string }>('http://localhost:3000/api/posts', post)
      .subscribe((postData) => {
        const id = postData.postId;
        post.id = id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });

  }

  deletePost(postId: string) {

    this.httpClient.delete('http://localhost:3000/api/posts/' + postId).subscribe(() => {
      const updatedPosts = this.posts.filter(post => post.id !== postId);
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }

}// EOF
