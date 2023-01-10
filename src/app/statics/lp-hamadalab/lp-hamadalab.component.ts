import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  ElementRef,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

//t = current time
//b = start value
//c = change in value
//d = duration
var easeInOutQuad = function (t: number, b: number, c: number, d: number) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
};
@Component({
  selector: 'app-lp-hamadalab',
  templateUrl: './lp-hamadalab.component.html',
  styleUrls: ['./lp-hamadalab.component.scss'],
})
export class LpHamadalabComponent implements OnInit, OnDestroy {
  data: Date = new Date();

  constructor(router: Router) {
    router.events.subscribe((s) => {
      if (s instanceof NavigationEnd) {
        const tree = router.parseUrl(router.url);
        if (tree.fragment) {
          const element = document.querySelector('#' + tree.fragment);
          if (element) {
            element.scrollIntoView();
          }
        }
      }
    });
  }

  ngOnInit() {
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('landing-page');
    body.classList.add('presentation-page'); // temporary
  }

  ngOnDestroy() {
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
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

  @HostListener('window:scroll', ['$event'])
  updateNavigation() {
    var contentSections = document.getElementsByClassName(
      'cd-section'
    ) as HTMLCollectionOf<any>;
    var navigationItems = document
      .getElementById('cd-vertical-nav')!
      .getElementsByTagName('a');

    for (let i = 0; i < contentSections.length; i++) {
      var activeSection: any =
        parseInt(navigationItems[i].getAttribute('data-number')!) - 1;

      if (
        contentSections[i].offsetTop - window.innerHeight / 2 <
          window.pageYOffset &&
        contentSections[i].offsetTop +
          contentSections[i].scrollHeight -
          window.innerHeight / 2 >
          window.pageYOffset
      ) {
        navigationItems[activeSection].classList.add('is-selected');
      } else {
        navigationItems[activeSection].classList.remove('is-selected');
      }
    }
  }

  smoothScroll(target: string) {
    var targetScroll = document.getElementById(target);
    this.scrollTo(
      document.scrollingElement || document.documentElement,
      targetScroll!.offsetTop,
      1250
    );
  }
  scrollTo(element: any, to: any, duration: any) {
    var start = element.scrollTop,
      change = to - start,
      currentTime = 0,
      increment = 20;

    var animateScroll = function () {
      currentTime += increment;
      var val = easeInOutQuad(currentTime, start, change, duration);
      element.scrollTop = val;
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  }
  ngAfterViewInit() {
    this.updateNavigation();
    (<any>window).twttr.widgets.load(document.getElementById('twitter'));
  }
}
