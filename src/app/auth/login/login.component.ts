import {
  Component,
  OnInit,
  OnDestroy,
  NgZone,
  ChangeDetectorRef,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MyOriginAuthService } from "../shared/auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  date: Date = new Date();
  errors: any[] = [];
  isClicked: boolean = false;
  footer: Date = new Date();
  user: any;

  focus!: boolean;
  focus1!: boolean;

  loginForm!: FormGroup;
  notifyMessage: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private auth: MyOriginAuthService,
    private router: Router,
    private route: ActivatedRoute,
    private zone: NgZone,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    let navbar = document.getElementsByTagName("nav")[0];
    navbar.classList.add("navbar-transparent");
    this.initForm();
  }

  ngOnDestroy() {
    let navbar = document.getElementsByTagName("nav")[0];
    navbar.classList.remove("navbar-transparent");
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: [
        "",
        [
          Validators.required,
          // Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
        ],
      ],
      password: ["", Validators.required],
    });
  }

  isInvlidForm(fieldname: any): boolean {
    return (
      this.loginForm.controls[fieldname].invalid &&
      (this.loginForm.controls[fieldname].dirty ||
        this.loginForm.controls[fieldname].touched)
    );
  }

  login() {
    this.isClicked = true;
    this.auth.login(this.loginForm.value).subscribe(
      (token) => {
        this.router.navigate(["/users/mypage"]);
      },
      (errorResponse: HttpErrorResponse) => {
        this.errors = errorResponse.error.errors;
        console.error(this.errors);
        this.isClicked = false;
      }
    );
  }

  showSwalSuccess() {
    Swal.fire({
      title: "Password has been updated!",
      text: "新しいパスワードでログインできます！",
      icon: "success",
      customClass: {
        confirmButton: "btn btn-primary btn-lg",
      },
      buttonsStyling: false,
      timer: 5000,
    });
  }
}
