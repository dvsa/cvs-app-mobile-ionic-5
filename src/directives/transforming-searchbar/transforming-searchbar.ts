import { AfterViewInit, Directive, ElementRef, Input, OnDestroy, Renderer2 } from '@angular/core';
// @TODO - Ionic 5 - enable this
// import { Events } from '@ionic/angular';
import { APP } from '../../app/app.enums';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import {EventsService} from '@providers/events/events.service';
import {Subscription} from 'rxjs';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[transforming-searchBar]'
})
export class TransformingSearchBarDirective implements AfterViewInit, OnDestroy {
  @Input() searchBarElemRef;
  headerElemRef;
  watchKeyboard;
  eventSubscription: Subscription;

  constructor(
    private el: ElementRef,
    private keyboard: Keyboard,
    private renderer: Renderer2,
    // @TODO - Ionic 5 - enable this
    private events: EventsService
  ) {
    this.headerElemRef = this.el.nativeElement;
  }

  ngAfterViewInit() {
    const navBarElement = this.headerElemRef.querySelector('ion-navbar');
    const scrollContent = this.headerElemRef.nextElementSibling.querySelector('.scroll-content');
    const ionToolbar = this.headerElemRef.querySelector('ion-toolbar');

    this.searchBarElemRef.ionFocus.subscribe(() => {
      this.renderer.removeClass(scrollContent, 'searchbar-scroll--margin-big');
      this.renderer.addClass(scrollContent, 'searchbar-scroll--margin-small');
      this.renderer.addClass(navBarElement, 'searchbar-navbar');
      this.renderer.addClass(ionToolbar, 'searchbar-ionToolBar');
    });

    this.searchBarElemRef.ionCancel.subscribe(() => {
      this.renderer.removeClass(scrollContent, 'searchbar-scroll--margin-small');
      this.renderer.addClass(scrollContent, 'searchbar-scroll--margin-big');
      this.renderer.removeClass(navBarElement, 'searchbar-navbar');
      this.renderer.removeClass(ionToolbar, 'searchbar-ionToolBar');
    });

    this.watchKeyboard = this.keyboard.onKeyboardHide().subscribe(() => {
      this.renderer.removeClass(scrollContent, 'searchbar-scroll--margin-small');
      this.renderer.addClass(scrollContent, 'searchbar-scroll--margin-big');
      this.renderer.removeClass(navBarElement, 'searchbar-navbar');
      this.renderer.removeClass(ionToolbar, 'searchbar-ionToolBar');
    });

    // @TODO - Ionic 5 - enable this
    this.eventSubscription = this.events.subscribe(APP.NAV_OUT, () => {
      this.setDefaultCss(scrollContent, navBarElement, ionToolbar);
    });
  }

  ngOnDestroy() {
    // @TODO - Ionic 5 - enable these if required?
    // this.searchBarElemRef.ionFocus.unsubscribe();
    // this.searchBarElemRef.ionCancel.unsubscribe();
    // this.watchKeyboard.unsubscribe();
    this.eventSubscription.unsubscribe();
  }

  private setDefaultCss(scrollContent, navBarElement, ionToolbar): void {
    this.renderer.addClass(scrollContent, 'searchbar-scroll--margin-big');
    this.renderer.addClass(scrollContent, 'searchbar-scroll--margin-bot');
    this.renderer.removeClass(navBarElement, 'searchbar-navbar');
    this.renderer.removeClass(ionToolbar, 'searchbar-ionToolBar');
  }
}
