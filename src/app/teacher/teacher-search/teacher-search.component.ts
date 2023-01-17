import { Component, OnInit } from '@angular/core';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/services/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import Swal from 'sweetalert2';
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

  addRequest(student: any) {
    Swal.fire({
      html: `<h5>${student.username}さん</h5>
          を生徒に登録申請しますか？
         `,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#51cbce',
      cancelButtonColor: '#9A9A9A',
      confirmButtonText: '申請する',
      cancelButtonText: 'キャンセル',
      reverseButtons: true,
      allowOutsideClick: false,
    }).then((result) => {
      if (!result.dismiss) {
        this.userService.addRequest(student).subscribe((success: any) => {
          Swal.fire({
            title: '申請しました！',
            text: '生徒が承認ボタンを押すまでお待ちください',
            icon: 'success',
            customClass: {
              confirmButton: 'btn btn-primary btn-lg',
            },
            buttonsStyling: false,
          }).then((result) => {
            this.router.navigate(['/teacher']);
          });
        });
      }
    });
  }
}
