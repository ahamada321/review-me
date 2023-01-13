import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  ElementRef,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { GoogleTagManagerService } from 'angular-google-tag-manager';
// import { BookingDemoComponent } from 'src/app/common/booking-demo/booking-demo.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit, OnDestroy {
  data: Date = new Date();
  activeTab = 1;
  activeTab1 = 1;
  // innerWidth: number; // Browser width

  constructor(
    public el: ElementRef,
    // private gtmService: GoogleTagManagerService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    // var navbar = document.getElementsByTagName('nav')[0];
    // navbar.classList.add('navbar-transparent');
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('landing-page');
    body.classList.add('presentation-page'); // temporary
    // this.innerWidth = window.innerWidth;
  }
  ngOnDestroy() {
    var navbar = document.getElementsByTagName('nav')[0];
    // navbar.classList.remove('navbar-transparent');
    if (navbar.classList.contains('nav-up')) {
      navbar.classList.remove('nav-up');
    }
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('landing-page');
    body.classList.remove('presentation-page'); // temporary
  }

  @HostListener('window:scroll')
  checkScroll() {
    const componentPosition = document.getElementsByClassName('add-animation');
    const scrollPosition = window.pageYOffset;

    for (var i = 0; i < componentPosition.length; i++) {
      var rec =
        componentPosition[i].getBoundingClientRect().top + window.scrollY + 100;
      if (scrollPosition + window.innerHeight >= rec) {
        componentPosition[i].classList.add('animated');
      } else if (scrollPosition + window.innerHeight * 0.8 < rec) {
        componentPosition[i].classList.remove('animated');
      }
    }
  }

  clickEvent(eventDetail: string) {
    // push GTM data layer with a custom event
    // const gtmTag = {
    //   event: 'button-click',
    //   data: eventDetail,
    // };
    // this.gtmService.pushTag(gtmTag);
  }
}
