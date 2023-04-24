import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { HttpErrorResponse } from "@angular/common/http";
import { Review } from "./service/review.model";
import { ReviewService } from "./service/review.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
  selector: "app-review",
  templateUrl: "./review.component.html",
  styleUrls: ["./review.component.scss"],
})
export class ReviewComponent implements OnInit {
  review: Review = new Review();
  @Input() postId!: string;
  @Output() reviewSubmitted = new EventEmitter();

  errors: any = [];

  constructor(private reviewService: ReviewService, private router: Router) {}

  ngOnInit() {}

  confirmReview() {
    this.reviewService.createReview(this.review, this.postId).subscribe(
      (review: Review) => {
        this.reviewSubmitted.emit(review);
        this.showSwalSuccess();
      },
      (errorResponse: HttpErrorResponse) => {
        console.error(errorResponse);
        this.errors = errorResponse.error.errors;
      }
    );
  }
  private showSwalSuccess() {
    Swal.fire({
      icon: "success",
      title: "レビューを送信しました",
      customClass: {
        confirmButton: "btn btn-primary btn-lg",
      },
      buttonsStyling: false,
    }).then(() => {
      this.router.navigate(["/users/mypage"]);
    });
  }
}
