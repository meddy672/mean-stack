import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: [
    './post-create.component.css'
  ]
})
export class PostCreateComponent implements OnInit {


  enteredTitle = '';
  enteredContent = '';
  post: Post;
  isLoading = false;
  private mode = 'create';
  private postId: string;

  // A service object to be used to create new post
  constructor(public postService: PostService, public route: ActivatedRoute) { }

  ngOnInit() {
    // Check to see if route is in edit mode
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        // Edit Mode
        this.mode = 'edit';
        this.isLoading = true;
        this.postId = paramMap.get('postId');

        this.postService.getPost(this.postId).subscribe(postData => {
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content
          }
          this.isLoading = false;
        });

      } else {
        // Create Mode
        this.mode = 'create';
        this.postId = null;
      }
    });
  }
  /**
   *
   * @param form
   * Takes in form from DOM
   */
  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postService.addPosts(form.value.title, form.value.content);
    } else {
      this.postService.updatePost(this.postId, form.value.title, form.value.content)
    }

    form.resetForm();
  }


}
