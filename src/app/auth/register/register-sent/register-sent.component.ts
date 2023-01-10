import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-register-sent',
  templateUrl: './register-sent.component.html',
  styleUrls: ['./register-sent.component.scss']
})
export class RegisterSentComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit() {
      let navbar = document.getElementsByTagName('nav')[0];
      navbar.classList.add('navbar-transparent');
  }
  ngOnDestroy(){
      let navbar = document.getElementsByTagName('nav')[0];
      navbar.classList.remove('navbar-transparent');
  }

}
