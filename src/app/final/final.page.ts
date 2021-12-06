import { Component, OnInit } from '@angular/core';
import {Router, UrlTree} from '@angular/router';
import {StateReformingService} from '@providers/global';

@Component({
  selector: 'app-final',
  templateUrl: './final.page.html',
  styleUrls: ['./final.page.scss'],
})
export class FinalPage implements OnInit {
  lastUrl: string | UrlTree;
  currentUrl: string;
  constructor(
    private router: Router,
    private stateReformingService: StateReformingService
  ) { }

  ngOnInit() {
    this.lastUrl = this.router.getCurrentNavigation().initialUrl;
    this.currentUrl = this.router.url;
    this.stateReformingService.updateNavStack();
  }

  async finish() {
    await this.router.navigate(['']);
    await this.stateReformingService.emptyStack();
  }
}
