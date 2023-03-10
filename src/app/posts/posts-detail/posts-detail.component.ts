import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  HostListener,
} from "@angular/core";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EventInput } from "@fullcalendar/core";
import timeGridPlugin from "@fullcalendar/timegrid";
import Swal from "sweetalert2";

@Component({
  selector: "app-posts-detail",
  templateUrl: "./posts-detail.component.html",
  styleUrls: ["./posts-detail.component.scss"],
})
export class PostsDetailComponent implements OnInit {
  calendarPlugins = [timeGridPlugin]; // important!
  calendarEvents: EventInput[] = [];
  calendarBusinessHours: EventInput[] = [];

  headerOffset: number = 75; // want to replace like DEFINE HEADER_OFFSET

  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    public router: Router,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      // this.getRental(params["rentalId"]);
    });
  }
}
