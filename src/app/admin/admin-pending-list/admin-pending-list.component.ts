import { Component, OnInit } from "@angular/core";
import { MyOriginAuthService } from "src/app/auth/shared/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "src/app/shared/services/user.service";
import { HttpErrorResponse } from "@angular/common/http";
import { PostService } from "src/app/post/shared/post.service";
import { Post } from "src/app/post/shared/post.model";

@Component({
  selector: "app-admin-pending-list",
  templateUrl: "./admin-pending-list.component.html",
  styleUrls: ["./admin-pending-list.component.scss"],
})
export class AdminPendingListComponent implements OnInit {
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
    this.getPendingPosts();
  }

  getPendingPosts() {
    this.postService.getPendingPosts(this.pageIndex, this.pageSize).subscribe(
      (result: any) => {
        this.posts = result[0].foundPosts;
        if (this.posts.length > 0) {
          this.pageCollectionSize = result[0].metadata[0].total;
        }
      },
      (err: any) => {
        console.error(err);
      }
    );
  }
}
