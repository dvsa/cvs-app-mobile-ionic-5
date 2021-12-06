import { Component, OnInit } from '@angular/core';
import {Router, UrlTree} from '@angular/router';
import {StateReformingService} from '@providers/global';

@Component({
  selector: 'app-another',
  templateUrl: './another.page.html',
  styleUrls: ['./another.page.scss'],
})
export class AnotherPage implements OnInit {
  lastUrl: string | UrlTree;
  currentUrl: string;
  constructor(
    private router: Router,
    private stateReformingService: StateReformingService
  ) { }

  ngOnInit() {
    this.lastUrl = this.router.getCurrentNavigation().initialUrl;
    this.currentUrl = this.router.url;
  }

  async navigateFinal() {
    await this.router.navigate(['final']);
  }

}
