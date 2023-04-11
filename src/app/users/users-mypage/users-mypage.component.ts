import { Component, OnInit } from "@angular/core";
import { MyOriginAuthService } from "src/app/auth/shared/auth.service";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { Post } from "src/app/post/shared/post.model";
import { PostService } from "src/app/post/shared/post.service";

@Component({
  selector: "app-users-mypage",
  templateUrl: "./users-mypage.component.html",
  styleUrls: ["./users-mypage.component.scss"],
})
export class UsersMypageComponent implements OnInit {
  pageIndex: number = 1;
  pageSize: number = 40; // Displaying contents per page.
  pageCollectionSize: number = 1;
  posts!: Post[];

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.getOwnerPosts();
  }

  getOwnerPosts() {
    this.postService.getOwnerPosts(this.pageIndex, this.pageSize).subscribe(
      (result: any) => {
        this.posts = result[0].foundPosts;
        this.pageCollectionSize = result[0].metadata[0].total;
      },
      (err: any) => {
        console.error(err);
      }
    );
  }
}
