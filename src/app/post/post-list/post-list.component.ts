import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../posts.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: [
    './post-list.component.css'
  ]
})
export class PostListComponent implements OnInit, OnDestroy {


  posts: Post[] = [];
  isLoading = false;

  // will fetch post subjectes from the post service OnInit
  private subscription: Subscription;

  // Creates post service to be used to fetch post data from the backend
  constructor(public postService: PostService) {


  }

  /**
   * When the pages loads postService will fetch data from the backend
   * and initialize post array variable.
   *
   * The subscription will be used to update the DOM and add new post to the array.
   */
  ngOnInit() {
    console.log('Getting Post');
    this.isLoading = true;
    this.postService.getPosts();
    this.subscription = this.postService.getUpdatedPostListener().subscribe((posts: Post[]) => {
      this.isLoading = false;
      this.posts = posts;
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDelete(postId: string) {
    this.postService.deletePost(postId);
  }


}

