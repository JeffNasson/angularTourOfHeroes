import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HeroesComponent} from './heroes/heroes.component';

//Begin Routes

const routes: Routes = [
  {path: 'heroes', component: HeroesComponent}
];

//End Routes

@NgModule({
  exports: [ RouterModule ],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}

// A typical Angular Route has two properties:

// path: a string that matches the URL in the browser address bar.
// component: the component that the router should create when navigating to this route.
