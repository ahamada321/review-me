import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teacher-change-password',
  templateUrl: './teacher-change-password.component.html',
  styleUrls: ['./teacher-change-password.component.scss'],
})
export class TeacherChangePasswordComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {}
}
