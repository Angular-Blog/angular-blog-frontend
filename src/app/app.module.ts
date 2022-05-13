import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { NgMaterialModule } from './ng-material/ng-material.module';

import { StoreModule } from '@ngrx/store';
import { userReducer } from './store/reducers/user-state.reducer';

import { AppComponent } from './app-component/app.component';
import { NavComponent } from './nav/nav.component';
import { SplashComponent } from './pages/splash/splash.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginFormComponent } from './pages/login/login-form/login-form.component';
import { SignupFormComponent } from './pages/login/signup-form/signup-form.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SplashComponent,
    NavComponent,
    HomeComponent,
    DashboardComponent,
    PageNotFoundComponent,
    LoginComponent,
    LoginFormComponent,
    SignupFormComponent
  ],
  imports: [
    StoreModule.forRoot({
      user: userReducer
    }),
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    NgMaterialModule,
    HttpClientModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
