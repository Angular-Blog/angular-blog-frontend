import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { NgMaterialModule } from './ng-material/ng-material.module';
import { MatGridListModule } from '@angular/material/grid-list';

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
import { HttpClientModule } from '@angular/common/http';

import { jwtInterceptorProvider } from './services/jwtinterceptor.provider';
import { errorInterceptorProvider } from './services/errorInterceptor.provider';
import { AuthService } from './services/auth.service';
import { PostService } from './services/post.service';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostComponentComponent } from './components/post-component/post-component.component';
import { UserComponent } from './pages/user/user.component';

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
    SignupFormComponent,
    PostListComponent,
    PostComponentComponent,
    UserComponent
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
    MatGridListModule,
  ],
  providers: [
    AuthService,
    PostService,
    jwtInterceptorProvider,
    errorInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
