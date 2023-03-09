import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  HostListener,
} from "@angular/core";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
// import { MyOriginAuthService } from "src/app/auth/service/auth.service";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
// import { LoginPopupComponent } from "src/app/auth/login-popup/login-popup.component";
// import { RentalBookingComponent } from "./rental-detail-booking/rental-booking.component";

import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
// import { Rental } from "../service/rental.model";
// import { Review } from "src/app/common/review/service/review.model";
// import { Booking } from "./rental-detail-booking/services/booking.model";
// import { RentalService } from "../service/rental.service";
// import { ReviewService } from "src/app/common/review/service/review.service";
import { EventInput } from "@fullcalendar/core";
import timeGridPlugin from "@fullcalendar/timegrid";
import Swal from "sweetalert2";

@Component({
  selector: "app-posts-detail",
  templateUrl: "./posts-detail.component.html",
  styleUrls: ["./posts-detail.component.scss"],
})
export class PostsDetailComponent implements OnInit, OnDestroy {
  // currentId: string;
  // rental: Rental;
  // rating: number;
  // reviews: Review[] = [];
  // safeUrl: SafeResourceUrl;
  calendarPlugins = [timeGridPlugin]; // important!
  calendarEvents: EventInput[] = [];
  calendarBusinessHours: EventInput[] = [];

  headerOffset: number = 75; // want to replace like DEFINE HEADER_OFFSET

  constructor(
    private route: ActivatedRoute,
    // private rentalService: RentalService,
    // private reviewService: ReviewService,
    private modalService: NgbModal,
    public router: Router,
    // public auth: MyOriginAuthService,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    let navbar = document.getElementsByTagName("nav")[0];
    navbar.classList.add("navbar-transparent");
    let body = document.getElementsByTagName("body")[0];
    body.classList.add("presentation-page");

    this.route.params.subscribe((params) => {
      // this.getRental(params["rentalId"]);
    });
  }

  ngOnDestroy() {
    let navbar = document.getElementsByTagName("nav")[0];
    navbar.classList.remove("navbar-transparent");
    let body = document.getElementsByTagName("body")[0];
    body.classList.remove("presentation-page");
    if (navbar.classList.contains("nav-up")) {
      navbar.classList.remove("nav-up");
    }
  }
}
