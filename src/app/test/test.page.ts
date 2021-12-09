import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router} from '@angular/router';
import {StateReformingService} from '@providers/global';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {
  pageName: string;
  lastPage: string;
  constructor(
    private router: Router,
    private stateReformingService: StateReformingService
) { }

  ngOnInit() {
    const navExtras = this.getNavExtras();
    this.pageName = navExtras.state.page;
  }

  getNavExtras(): NavigationExtras {
    const extras = this.router.getCurrentNavigation().extras;
    if (extras.state !== undefined) {
      return extras;
    } else {
      return this.stateReformingService.getOldNavigationalExtrasForPage(this.router.url).extras;
    }
  }

  async navigateAgain() {
    await this.router.navigate(['another']);
  }
}
