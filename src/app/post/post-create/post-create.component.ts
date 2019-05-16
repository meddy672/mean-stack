import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: [
    './post-create.component.css'
  ]
})
export class PostCreateComponent {


  enteredTitle = "";
  enteredContent = "";

  // A service object to be used to create new post
  constructor(public postService: PostService) { }

  /**
   *
   * @param form
   * Takes in form from DOM
   */
  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.postService.addPosts(form.value.title, form.value.content);
    form.resetForm();
  }


}
