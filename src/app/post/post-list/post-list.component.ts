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
  private subscription: Subscription;
  constructor(public postService: PostService) {


  }

  ngOnInit() {
    console.log('Getting Post');
    this.posts = this.postService.getPosts();
    this.subscription = this.postService.getUpdatedPostListener().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
