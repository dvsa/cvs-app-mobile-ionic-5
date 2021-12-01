import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {
  bigLie: string;
  constructor(
    private router: Router

  ) { }

  ngOnInit() {
    this.bigLie = this.router.getCurrentNavigation().extras.state.lie;
  }

  async navigateAgain() {
    await this.router.navigate(['another']);
  }
}
