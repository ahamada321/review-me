import { Component, OnInit, OnDestroy } from "@angular/core";
import { MyOriginAuthService } from "../../service/auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LoginPopupComponent } from "src/app/auth/login-popup/login-popup.component";
import Swal from "sweetalert2";

@Component({
  selector: "app-login-newpassword",
  templateUrl: "./login-newpassword.component.html",
  styleUrls: ["./login-newpassword.component.scss"],
})
export class LoginNewPasswordComponent implements OnInit, OnDestroy {
  footer: Date = new Date();

  focus: any;
  focus1: any;
  focus2: any;

  formData: any = {};
  errors: any[] = [];
  verifyToken: any;

  constructor(
    private auth: MyOriginAuthService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    let navbar = document.getElementsByTagName("nav")[0];
    navbar.classList.add("navbar-transparent");
    let body = document.getElementsByTagName("body")[0];
    body.classList.add("full-screen");
    body.classList.add("register-page");

    this.route.params.subscribe((params) => {
      this.verifyToken = params["verifyToken"];
    });
  }

  ngOnDestroy() {
    let navbar = document.getElementsByTagName("nav")[0];
    navbar.classList.remove("navbar-transparent");
    let body = document.getElementsByTagName("body")[0];
    body.classList.remove("full-screen");
    body.classList.remove("register-page");
  }

  setNewPassword() {
    this.auth.setNewPassword(this.formData, this.verifyToken).subscribe(
      () => {
        this.showSwalSuccess();
      },
      (errorResponse: HttpErrorResponse) => {
        console.error(errorResponse);
        this.errors = errorResponse.error.errors;
      }
    );
  }

  showSwalSuccess() {
    Swal.fire({
      icon: "success",
      title: "パスワード更新完了",
      text: "新しいパスワードでログインできます！",
      customClass: {
        confirmButton: "btn btn-primary btn-lg",
      },
      buttonsStyling: false,
    }).then(() => {
      this.modalLoginOpen();
    });
  }

  modalLoginOpen() {
    this.router.navigate(["/"]);
    this.modalService.open(LoginPopupComponent, { backdrop: "static" });
  }
}
