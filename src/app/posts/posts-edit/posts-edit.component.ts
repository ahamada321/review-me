import { Component, OnInit } from "@angular/core";
import { MyOriginAuthService } from "src/app/auth/shared/auth.service";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "src/app/shared/services/user.service";
import { HttpErrorResponse } from "@angular/common/http";
import Swal from "sweetalert2";

@Component({
  selector: "app-posts-edit",
  templateUrl: "./posts-edit.component.html",
  styleUrls: ["./posts-edit.component.scss"],
})
export class PostsEditComponent implements OnInit {
  isClicked: boolean = false;
  errors: any = [];
  userData: any;
  userId = this.auth.getUserId();

  constructor(
    private auth: MyOriginAuthService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getMe();
  }

  getMe() {
    this.userService.getUserById(this.userId).subscribe(
      (foundUser) => {
        this.userData = foundUser;
      },
      (errorResponse: HttpErrorResponse) => {
        this.errors = errorResponse.error.errors;
      }
    );
  }

  updateUser(UserForm: NgForm) {
    this.isClicked = true;
    UserForm.value.oldEmail = this.userData.email;

    this.auth.updateUser(this.userId, UserForm.value).subscribe(
      (Updated) => {
        this.isClicked = false;
        this.showSwalSuccess();
      },
      (errorResponse: HttpErrorResponse) => {
        this.isClicked = false;
        this.showSwalError();
        this.errors = errorResponse.error.errors;
      }
    );
  }

  private showSwalSuccess() {
    Swal.fire({
      // title: 'User infomation has been updated!',
      icon: "success",
      title: "設定が変更されました",
      customClass: {
        confirmButton: "btn btn-primary btn-lg",
      },
      buttonsStyling: false,
    }).then(() => {
      this.router.navigate(["/teacher"]);
    });
  }
  private showSwalError() {
    Swal.fire({
      title: "通信エラー",
      text: "もう一度変更ボタンを押しなおしてください",
      icon: "error",
      customClass: {
        confirmButton: "btn btn-danger btn-lg",
      },
      buttonsStyling: false,
    });
  }
}
