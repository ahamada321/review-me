import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  //   styleUrls: ["./post.component.scss"],
})
export class PostComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {}
}
