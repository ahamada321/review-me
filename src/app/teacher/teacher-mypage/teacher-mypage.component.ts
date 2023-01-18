import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { CalendarOptions } from '@fullcalendar/core';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  selector: 'app-teacher-mypage',
  templateUrl: './teacher-mypage.component.html',
  styleUrls: ['./teacher-mypage.component.scss'],
})
export class TeacherMypageComponent implements OnInit {
  active = 1;

  calendarOptionsPerDay: any = {
    initialView: 'listDay',
    plugins: [listPlugin],
    locale: 'ja',
    businessHours: true,
    views: {
      list: { buttonText: 'list' },
    },
    headerToolbar: {
      left: '',
      center: 'title',
    },
    events: [
      {
        title: 'Meeting',
        start: '2023-01-24T14:30:00',
        extendedProps: {
          status: 'done',
        },
      },
      {
        title: 'Birthday Party',
        start: '2023-01-18T22:20:00',
        backgroundColor: 'green',
        borderColor: 'green',
      },
      {
        title: 'Birthday Party',
        start: '2023-01-18T17:00:00',
        backgroundColor: 'pink',
        borderColor: 'pink',
      },
      {
        title: 'Birthday Party',
        start: '2023-01-18T17:20:00',
        backgroundColor: 'green',
        borderColor: 'green',
      },
    ],

    //  　●日の"日"の部分を消したかったが日付が全て消えてしまう
    // dayCellContent(e: any) {
    //   e.dayNumberText = e.dayNumberText.replace('日', 'aaa');
    // },
  };

  calendarOptionsPerMonth: any = {
    initialView: 'dayGridMonth',
    plugins: [listPlugin, dayGridPlugin],
    locale: 'ja',
    navLinks: true,
    businessHours: true,
    dayMaxEventRows: true,
    views: {
      list: { buttonText: 'list' },
      dayGridMonth: {
        dayMaxEventRows: 4, // adjust to 4 only for dayGridMonth
      },
    },
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'dayGridMonth,listMonth',
    },
    events: [
      {
        title: 'Meeting',
        start: '2023-01-24T14:30:00',
        extendedProps: {
          status: 'done',
        },
      },
      {
        title: 'Birthday Party',
        start: '2023-01-18T07:00:00',
        backgroundColor: 'green',
        borderColor: 'green',
      },
      {
        title: 'lesson',
        start: '2023-01-24T14:30:00',
        extendedProps: {
          status: 'done',
        },
      },
      {
        title: 'Meeting',
        start: '2023-01-24T14:30:00',
        extendedProps: {
          status: 'done',
        },
      },
      {
        title: 'lesson',
        start: '2023-01-24T14:30:00',
        extendedProps: {
          status: 'done',
        },
      },
      {
        title: 'Meeting',
        start: '2023-01-24T14:30:00',
        extendedProps: {
          status: 'done',
        },
      },
      {
        title: 'Birthday Party',
        start: '2023-01-18T22:20:00',
        backgroundColor: 'green',
        borderColor: 'green',
      },
      {
        title: 'Birthday Party',
        start: '2023-01-18T17:00:00',
        backgroundColor: 'pink',
        borderColor: 'pink',
      },
      {
        title: 'Birthday Party',
        start: '2023-01-18T17:20:00',
        backgroundColor: 'green',
        borderColor: 'green',
      },
    ],
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public auth: MyOriginAuthService
  ) {}

  ngOnInit() {}
}
