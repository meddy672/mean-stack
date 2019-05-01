import { Component, Input } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../posts.service';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: [
    './post-list.component.css'
  ]
})
export class PostListComponent {

  // posts = [
  //   { title: 'First Post', content: 'This is the First Post content', },
  //   { title: 'Second Post', content: 'This is the Second Post content', },
  //   { title: 'Third Post', content: 'This is the Third Post content', }
  // ]

  @Input() posts: Post[] = [];

  constructor(public postService: PostService) {

  }
}
