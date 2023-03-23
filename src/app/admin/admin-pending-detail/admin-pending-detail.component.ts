import { Component, OnInit } from "@angular/core";

import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { Post } from "src/app/post/shared/post.model";
import { PostService } from "src/app/post/shared/post.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-admin-pending-detail",
  templateUrl: "./admin-pending-detail.component.html",
  styleUrls: ["./admin-pending-detail.component.scss"],
})
export class AdminPendingDetailComponent implements OnInit {
  isClicked: boolean = false;
  errors: any = [];
  post!: Post;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.getPost(params["postId"]);
    });
  }

  getPost(postId: string) {
    this.postService.getPostById(postId).subscribe(
      (post: Post) => {
        this.post = post;
      },
      (errorResponse: HttpErrorResponse) => {
        console.error(errorResponse);
        this.errors = errorResponse.error.errors;
      }
    );
  }
  acceptButton() {
    this.isClicked = true;
    this.post.status = "active";
    Swal.fire({
      html: `
          <h4>申請の承認</h4>
          <h4>この申請を承認しますか？</h4>
`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#51cbce",
      cancelButtonColor: "#9A9A9A",
      confirmButtonText: "はい",
      cancelButtonText: "いいえ",
      reverseButtons: true,
      allowOutsideClick: false,
    }).then((result) => {
      if (!result.dismiss) {
        this.updatePost();
      } else {
        this.isClicked = false;
      }
    });
  }
  updatePost() {
    this.postService.updatePost(this.post).subscribe(
      (Message) => {
        this.showSwalSuccess();
      },
      (errorResponse: HttpErrorResponse) => {
        this.isClicked = false;
        console.error(errorResponse);
        this.errors = errorResponse.error.errors;
      }
    );
  }
  private showSwalSuccess() {
    Swal.fire({
      // title: 'User infomation has been updated!',
      icon: "success",
      title: "申請を承認しました",
      customClass: {
        confirmButton: "btn btn-primary btn-lg",
      },
      buttonsStyling: false,
    }).then(() => {
      this.router.navigate(["/admin"]);
    });
  }
}
