import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {StateReformingService} from '@providers/global';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {
  pageName: string;
  constructor(
    private router: Router,
    private stateReformingService: StateReformingService


) { }

  ngOnInit() {
    this.pageName = this.router.getCurrentNavigation().extras.state.pageName;
  }

  async navigateAgain() {
    await this.router.navigate(['another']);
  }
}
