import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  //   styleUrls: ["./users.component.scss"],
})
export class AdminComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {}
}
