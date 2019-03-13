import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HeroesComponent} from './heroes/heroes.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';

//Begin Routes

const routes: Routes = [
  {path:'', redirectTo: '/dashboard', pathMatch: 'full'}, //redirects empty paths to /dashboard
  {path: 'dashboard', component: DashboardComponent},
  {path: 'detail/:id', component: HeroDetailComponent},
  {path: 'heroes', component: HeroesComponent},
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
