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
  errors: any = [];

  constructor() {}

  ngOnInit() {}
}
