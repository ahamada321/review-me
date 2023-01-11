import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-change-password',
  templateUrl: './student-change-password.component.html',
  styleUrls: ['./student-change-password.component.scss'],
})
export class StudentChangePasswordComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {}
}
