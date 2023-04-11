import { Component, OnInit } from "@angular/core";
import { MyOriginAuthService } from "src/app/auth/shared/auth.service";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "src/app/shared/services/user.service";
import { HttpErrorResponse } from "@angular/common/http";
import Swal from "sweetalert2";
import { Post } from "../shared/post.model";
import { PostService } from "../shared/post.service";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.scss"],
})
export class PostCreateComponent implements OnInit {
  isClicked: boolean = false;
  errors: any = [];
  newPost = new Post();

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit() {}

  saveAsDraftPost() {
    this.isClicked = true;
    this.newPost.status = "draft";
    this.postService.createPost(this.newPost).subscribe(
      (post: Post) => {
        this.showSwalSuccess();
      },
      (errorResponse: HttpErrorResponse) => {
        console.error(errorResponse);
        this.errors = errorResponse.error.errors;
      }
    );
  }

  createPost() {
    this.isClicked = true;
    this.newPost.status = "pending";
    this.postService.createPost(this.newPost).subscribe(
      (post: Post) => {
        this.showSwalSuccess();
      },
      (errorResponse: HttpErrorResponse) => {
        console.error(errorResponse);
        this.errors = errorResponse.error.errors;
      }
    );
  }

  private showSwalSuccess() {
    Swal.fire({
      icon: "success",
      title: "下書き保存しました",
      customClass: {
        confirmButton: "btn btn-primary btn-lg",
      },
      buttonsStyling: false,
    }).then(() => {
      this.router.navigate(["/users/mypage"]);
    });
  }
}
