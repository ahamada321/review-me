import { Component, OnInit } from "@angular/core";
import { MyOriginAuthService } from "src/app/auth/shared/auth.service";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "src/app/shared/services/user.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-posts-lists",
  templateUrl: "./posts-lists.component.html",
  styleUrls: ["./posts-lists.component.scss"],
})
export class PostsListsComponent implements OnInit {
  isClicked: boolean = false;
  errors: any = [];
  userData: any;
  userId = this.auth.getUserId();

  constructor(
    private auth: MyOriginAuthService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {}
}
