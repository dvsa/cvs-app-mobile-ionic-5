import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {NavStateModel, StateReformingService} from '@providers/global';
import { NavParamService } from '@app/nav-param.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {
  pageName: string;
  route: string;
  constructor(
    private router: Router,
    private stateReformingService: StateReformingService,
    private navParamService: NavParamService
) {
    this.pageName = this.navParamService.returnNavData('page');
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.route = '';
    this.stateReformingService.navStack.forEach(nav => {
      this.route += nav.page;
    });
  }

  async navigateAgain() {
    await this.router.navigate(['another']);
  }
}
