import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  HostListener,
} from "@angular/core";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { Post } from "../shared/post.model";
import { PostService } from "../shared/post.service";
import { Review } from "src/app/shared/review/service/review.model";
import { ReviewService } from "src/app/shared/review/service/review.service";

@Component({
  selector: "app-post-result",
  templateUrl: "./post-result.component.html",
  styleUrls: ["./post-result.component.scss"],
})
export class PostResultComponent implements OnInit {
  isClicked: boolean = false;
  errors: any = [];
  post!: Post;
  reviews!: Review[];
  review!: Review;

  // barChartData = {
  //   labels: ["強くそう思う", "そう思う", "そう思わない", "強くそう思わない"],
  //   datasets: [
  //     { data: 1, label: "強くそう思う" },
  //     { data: 2, label: "そう思う" },
  //     { data: 2, label: "そう思わない" },
  //     { data: 2, label: "強くそう思わない" },
  //   ],
  // };
  // barChartOptions = {
  // };

  constructor(
    private postService: PostService,
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.getPost(params["postId"]);
      this.getReviews(params["postId"]);
    });
  }

  getPost(postId: string) {
    this.postService.getPostById(postId).subscribe(
      (post: Post) => {
        this.post = post;
      },
      (errorResponse: HttpErrorResponse) => {
        console.error(errorResponse);
        this.errors = errorResponse.error.errors;
      }
    );
  }
  getReviews(postId: string) {
    this.reviewService.getReviews(postId).subscribe(
      (reviews: Review[]) => {
        this.reviews = reviews;
      },
      (errorResponse: HttpErrorResponse) => {
        console.error(errorResponse);
        this.errors = errorResponse.error.errors;
      }
    );
  }
}
