import { NgModule } from '@angular/core';
import { TransformingSearchBarDirective } from './transforming-searchbar/transforming-searchbar';

const DIRECTIVES = [TransformingSearchBarDirective];

@NgModule({
  declarations: [...DIRECTIVES],
  imports: [],
  exports: [...DIRECTIVES]
})
export class DirectivesModule {}
