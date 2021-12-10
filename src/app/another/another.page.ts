import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateReformingService } from '@providers/global';

@Component({
  selector: 'app-another',
  templateUrl: './another.page.html',
  styleUrls: ['./another.page.scss'],
})
export class AnotherPage implements OnInit {
  lastPage: string;
  route: string;
  constructor(
    private router: Router,
    private stateReformingService: StateReformingService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.route = '';
    this.stateReformingService.navStack.forEach(nav => {
      this.route += nav.page;
    });
  }

  async navigateFinal() {
    await this.router.navigate(['final']);
  }

}
