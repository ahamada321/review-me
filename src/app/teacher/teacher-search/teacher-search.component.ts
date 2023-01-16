import { Component, OnInit } from '@angular/core';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/services/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-teacher-search',
  templateUrl: './teacher-search.component.html',
  styleUrls: ['./teacher-search.component.scss'],
})
export class TeacherSearchComponent implements OnInit {
  students!: User[];
  constructor(
    private auth: MyOriginAuthService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {}
  ngOnDestroy() {}

  getStudents() {
    this.route.queryParams.subscribe((keywords) => {});
  }

  filterByStudentName(searchWords: string) {
    if (searchWords) {
      this.userService.searchUsers({ searchWords }).subscribe(
        (foundStudents) => {
          this.students = foundStudents;
          // this.pageCollectionSize = result[0].metadata[0].total;
        },
        (err) => {
          console.error(err);
        }
      );
    } else {
      this.students = [];
    }
  }
}
