import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {StateReformingService} from '@providers/global';

@Component({
  selector: 'app-final',
  templateUrl: './final.page.html',
  styleUrls: ['./final.page.scss'],
})
export class FinalPage implements OnInit {
  lastPage: string;
  constructor(
    private router: Router,
    private stateReformingService: StateReformingService
  ) { }

  ngOnInit() {
    this.stateReformingService.updateNavStack();
  }

  async finish() {
    await this.router.navigate(['']);
    await this.stateReformingService.emptyStack();
  }

}
