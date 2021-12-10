import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateReformingService } from '@providers/global';

@Component({
  selector: 'app-final',
  templateUrl: './final.page.html',
  styleUrls: ['./final.page.scss'],
})
export class FinalPage implements OnInit {
  route: string;
  constructor(
    private router: Router,
    private stateReformingService: StateReformingService
  ) { }

  ngOnInit() {
    this.stateReformingService.updateState();
  }

  ionViewWillEnter() {
    this.route = '';
    this.stateReformingService.navStack.forEach(nav => {
      this.route += nav.page;
    });
  }

  async finish() {
    await this.router.navigate(['']);
    await this.stateReformingService.emptyStack();
  }

}
