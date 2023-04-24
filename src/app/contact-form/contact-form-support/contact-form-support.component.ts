import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { User } from "src/app/shared/services/user.model";
import { UserService } from "src/app/shared/services/user.service";
import { ContactForm } from "../shared/contactform.model";
import { ContactFormService } from "../shared/contactform.service";
import { MyOriginAuthService } from "src/app/auth/shared/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-contact-form-support",
  templateUrl: "./contact-form-support.component.html",
  styleUrls: ["./contact-form-support.component.scss"],
})
export class ContactFormSupportComponent implements OnInit, OnDestroy {
  contactusForm!: FormGroup;
  errorResponse!: HttpErrorResponse;
  userData!: User;
  userId = this.auth.getUserId();
  errors: any = [];

  constructor(
    private auth: MyOriginAuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private contactformService: ContactFormService,
    private userService: UserService
  ) {}

  ngOnInit() {
    var navbar = document.getElementsByTagName("nav")[0];
    navbar.classList.add("navbar-transparent");
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("contact-page");
    this.initForm();
    this.getMe();
  }
  ngOnDestroy() {
    var navbar = document.getElementsByTagName("nav")[0];
    navbar.classList.remove("navbar-transparent");
    if (navbar.classList.contains("nav-up")) {
      navbar.classList.remove("nav-up");
    }
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("contact-page");
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

  initForm() {
    this.contactusForm = this.formBuilder.group({
      msg: ["", { nonNullable: true }],
    });
  }

  isInvalidForm(fieldname: string): boolean {
    return (
      this.contactusForm.controls[fieldname].invalid &&
      this.contactusForm.controls[fieldname].touched
    );
    //  (this.contactForm.controls[fieldname].dirty ||
    //  this.contactForm.controls[fieldname].touched)
  }

  sendMessage(contactusForm: FormGroup) {
    contactusForm.value.username = this.userData.username;
    contactusForm.value.email = this.userData.email;

    this.contactformService.sendFormMsg(contactusForm.value).subscribe(
      (Message) => {
        contactusForm.reset();
        this.showSwalSuccess();
      },
      (errorResponse: HttpErrorResponse) => {
        this.errorResponse = errorResponse;
      }
    );
  }

  private showSwalSuccess() {
    Swal.fire({
      icon: "success",
      title: "送信されました",
      text: "確認次第折り返しご連絡させていただきます",
      customClass: {
        confirmButton: "btn btn-primary btn-lg",
      },
      buttonsStyling: false,
      timer: 5000,
    }).then(() => {
      if (this.userData.userRole === "Worker") {
        this.router.navigate(["/teacher"]);
      } else if (this.userData.userRole === "User") {
        this.router.navigate(["/student"]);
      }
    });
  }
}
