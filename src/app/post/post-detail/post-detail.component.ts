import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  HostListener,
} from "@angular/core";

import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { Post } from "../shared/post.model";
import { PostService } from "../shared/post.service";

@Component({
  selector: "app-post-detail",
  templateUrl: "./post-detail.component.html",
  styleUrls: ["./post-detail.component.scss"],
})
export class PostDetailComponent implements OnInit {
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
}
