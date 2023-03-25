import { Component, OnInit } from "@angular/core";
import { MyOriginAuthService } from "src/app/auth/shared/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "src/app/shared/services/user.service";
import { HttpErrorResponse } from "@angular/common/http";
import { PostService } from "src/app/post/shared/post.service";
import { Post } from "src/app/post/shared/post.model";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.scss"],
})
export class PostListComponent implements OnInit {
  errors: any = [];

  pageIndex: number = 1;
  pageSize: number = 40; // Displaying contents per page.
  pageCollectionSize: number = 1;
  posts: Post[] = [];

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.route.queryParams.subscribe((keywords) => {
      this.postService
        .getPosts(keywords, this.pageIndex, this.pageSize)
        .subscribe(
          (result) => {
            this.posts = result[0].foundPosts;
            this.pageCollectionSize = result[0].metadata[0].total;
          },
          (err) => {
            console.error(err);
          }
        );
    });
  }
}
