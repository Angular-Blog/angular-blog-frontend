import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SplashComponent } from './pages/splash/splash.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { NavComponent } from './nav/nav.component';

const routes: Routes = [
  {
    path: '',
    component: SplashComponent,
  },
  {
    path: 'login',
    component: HomeComponent
  },
  {
    path: 'home',
    children: [
      {
        path: 'dash',
        component: DashboardComponent
      },
      {
        path: 'profile',
        component: HomeComponent
      },
      {
        path: '**',
        redirectTo: 'dash'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'splash'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }