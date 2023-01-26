import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent implements OnInit {
  searchWords!: string;
  @Output() event = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  searchBy(searchWords?: string) {
    this.event.emit(searchWords);
  }
}
